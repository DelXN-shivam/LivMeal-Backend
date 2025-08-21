import MessMenu from "../models/MessMenu.js";
import { Mess } from "../models/Mess.js";

// Add/Update Daily Menu
export const addOrUpdateMenu = async (req, res) => {
  try {
    const { messId, date, mealType, dietaryPreference, items, actualTime } = req.body;

    if (!messId || !date || !mealType || !dietaryPreference || !items || !actualTime) {
      return res.status(400).json({
        success: false,
        message: "messId, date, mealType, dietaryPreference, items, and actualTime are required"
      });
    }

    const updatePath = `dailyMenus.${date}.${mealType}`;
    
    let messMenu = await MessMenu.findOneAndUpdate(
      { messId },
      {
        $set: {
          [updatePath]: {
            dietaryPreference,
            items,
            actualTime
          }
        }
      },
      { new: true, upsert: true }
    );

    // Link MessMenu to Mess if not already linked
    await Mess.findByIdAndUpdate(
      messId,
      { messMenu: messMenu._id },
      { new: true }
    );

    const menuData = messMenu.dailyMenus.get(date)?.[mealType];
    
    res.status(200).json({ 
      success: true, 
      menu: {
        date,
        mealType,
        ...menuData
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Menu for a Mess by Date
export const getMenuByDate = async (req, res) => {
  try {
    const { messId, date } = req.params;

    const messMenu = await MessMenu.findOne({ messId }).populate('messId', 'messName ownerName').lean();
    
    if (!messMenu) {
      return res.status(404).json({ success: false, message: "No menu found for this mess" });
    }

    const dayMenu = messMenu.dailyMenus[date] || {};
    const menus = [];

    Object.entries(dayMenu).forEach(([mealType, menu]) => {
      if (menu && menu.items && menu.items.length > 0) {
        menus.push({
          date,
          mealType,
          dietaryPreference: menu.dietaryPreference,
          items: menu.items,
          actualTime: menu.actualTime
        });
      }
    });

    res.status(200).json({ 
      success: true,
      messInfo: messMenu.messId,
      count: menus.length,
      menus
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All Menus for a Mess
export const getAllMenus = async (req, res) => {
  try {
    const { messId } = req.params;

    const messMenu = await MessMenu.findOne({ messId }).populate('messId', 'messName ownerName').lean();
    
    if (!messMenu) {
      return res.status(404).json({ success: false, message: "No menu found for this mess" });
    }

    const allMenus = [];
    
    Object.entries(messMenu.dailyMenus).forEach(([date, dayMenu]) => {
      Object.entries(dayMenu).forEach(([mealType, menu]) => {
        if (menu && menu.items && menu.items.length > 0) {
          allMenus.push({
            date,
            mealType,
            dietaryPreference: menu.dietaryPreference,
            items: menu.items,
            actualTime: menu.actualTime
          });
        }
      });
    });

    res.status(200).json({ 
      success: true,
      messInfo: messMenu.messId,
      count: allMenus.length,
      menus: allMenus.sort((a, b) => new Date(b.date) - new Date(a.date))
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Recent Menus (last 7 days)
export const getRecentMenus = async (req, res) => {
  try {
    const { messId } = req.params;
    const days = parseInt(req.query.days) || 7;

    const messMenu = await MessMenu.findOne({ messId }).populate('messId', 'messName ownerName').lean();
    
    if (!messMenu) {
      return res.status(404).json({ success: false, message: "No menu found for this mess" });
    }

    const recentMenus = [];
    const today = new Date();
    
    // Generate date strings for the last N days
    for (let i = 0; i < days; i++) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() - i);
      const dateStr = targetDate.toISOString().split('T')[0];
      
      const dayMenu = messMenu.dailyMenus[dateStr];
      if (dayMenu) {
        Object.entries(dayMenu).forEach(([mealType, menu]) => {
          if (menu && menu.items && menu.items.length > 0) {
            recentMenus.push({
              date: dateStr,
              mealType,
              dietaryPreference: menu.dietaryPreference,
              items: menu.items,
              actualTime: menu.actualTime
            });
          }
        });
      }
    }

    res.status(200).json({ 
      success: true,
      messInfo: messMenu.messId,
      daysRequested: days,
      count: recentMenus.length,
      menus: recentMenus.sort((a, b) => new Date(b.date) - new Date(a.date))
    });
  } catch (error) {
    console.error('Error in getRecentMenus:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all menus by specific date (across all messes)
export const getAllMenusByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const messMenus = await MessMenu.find({}).populate('messId', 'messName ownerName address messType').lean();
    
    const allMenus = [];
    
    messMenus.forEach(messMenu => {
      const dayMenu = messMenu.dailyMenus[date];
      if (dayMenu) {
        Object.entries(dayMenu).forEach(([mealType, menu]) => {
          if (menu && menu.items && menu.items.length > 0) {
            allMenus.push({
              messInfo: messMenu.messId,
              date,
              mealType,
              dietaryPreference: menu.dietaryPreference,
              items: menu.items,
              actualTime: menu.actualTime
            });
          }
        });
      }
    });

    res.status(200).json({ 
      success: true,
      date,
      count: allMenus.length,
      menus: allMenus
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all menus of all messes
export const getAllMessesMenus = async (req, res) => {
  try {
    const messMenus = await MessMenu.find({}).populate('messId', 'messName ownerName address messType').lean();
    
    const allMenus = [];
    
    messMenus.forEach(messMenu => {
      Object.entries(messMenu.dailyMenus).forEach(([date, dayMenu]) => {
        Object.entries(dayMenu).forEach(([mealType, menu]) => {
          if (menu && menu.items && menu.items.length > 0) {
            allMenus.push({
              messInfo: messMenu.messId,
              date,
              mealType,
              dietaryPreference: menu.dietaryPreference,
              items: menu.items,
              actualTime: menu.actualTime
            });
          }
        });
      });
    });

    res.status(200).json({ 
      success: true,
      count: allMenus.length,
      menus: allMenus.sort((a, b) => new Date(b.date) - new Date(a.date))
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get today's menu of all messes
export const getTodaysMenus = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const messMenus = await MessMenu.find({}).populate('messId', 'messName ownerName address messType').lean();
    
    const todaysMenus = [];
    
    messMenus.forEach(messMenu => {
      const dayMenu = messMenu.dailyMenus[today];
      if (dayMenu) {
        Object.entries(dayMenu).forEach(([mealType, menu]) => {
          if (menu && menu.items && menu.items.length > 0) {
            todaysMenus.push({
              messInfo: messMenu.messId,
              date: today,
              mealType,
              dietaryPreference: menu.dietaryPreference,
              items: menu.items,
              actualTime: menu.actualTime
            });
          }
        });
      }
    });

    res.status(200).json({ 
      success: true,
      date: today,
      count: todaysMenus.length,
      menus: todaysMenus
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete Menu by Date
export const deleteMenuByDate = async (req, res) => {
  try {
    const { messId, date } = req.params;
    const { mealType } = req.query;

    if (mealType) {
      // Delete specific meal
      const updatePath = `dailyMenus.${date}.${mealType}`;
      await MessMenu.findOneAndUpdate(
        { messId },
        { $unset: { [updatePath]: "" } }
      );
    } else {
      // Delete entire day
      await MessMenu.findOneAndUpdate(
        { messId },
        { $unset: { [`dailyMenus.${date}`]: "" } }
      );
    }

    res.status(200).json({ 
      success: true, 
      message: mealType ? `${mealType} menu deleted for ${date}` : `All menus deleted for ${date}`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};