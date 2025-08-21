import express from "express";
import { 
  addOrUpdateMenu, 
  getMenuByDate, 
  getAllMenus, 
  getRecentMenus,
  getAllMenusByDate,
  getAllMessesMenus,
  getTodaysMenus,
  deleteMenuByDate 
} from "../controllers/menuController.js";

const menuRouter = express.Router();

// Add or Update menu
menuRouter.post("/add", addOrUpdateMenu);

// Get menu by date for specific mess
menuRouter.get("/mess/:messId/:date", getMenuByDate);

// Get all menus for specific mess
menuRouter.get("/mess/:messId", getAllMenus);

// Get recent menus for specific mess
menuRouter.get("/recent/:messId", getRecentMenus);

// Get all menus by specific date (across all messes)
menuRouter.get("/date/:date", getAllMenusByDate);

// Get all menus of all messes
menuRouter.get("/all", getAllMessesMenus);

// Get today's menu of all messes
menuRouter.get("/today", getTodaysMenus);

// Delete menu by date
menuRouter.delete("/mess/:messId/:date", deleteMenuByDate);

export default menuRouter;