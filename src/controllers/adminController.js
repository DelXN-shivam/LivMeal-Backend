import bcrypt from 'bcrypt';
import { Admin } from '../models/Admin.js';

export const adminRegister = async (req, res) => {
    try {
        const { email, name, contact, password } = req.body;

        if (!name || !email || !contact || !password) {
            return res.status(411).json({
                message: "Please provide all the values"
            });
        }

        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(409).json({
                message: "Admin already exists, please login"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = await Admin.create({
            email,
            name,
            contact,
            password: hashedPassword
        });

        return res.status(200).json({
            message: "Admin registered successfully",
            data: {
                _id: newAdmin._id,
                email: newAdmin.email,
                name: newAdmin.name,
                contact: newAdmin.contact
            }
        });

    } catch (err) {
        console.error('Server Error:', err);
        return res.status(500).json({
            message: "Server error. Please try again later."
        });
    }
};


export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(411).json({
                message: "Please provide email and password"
            })
        }

        const existingAdmin = await Admin.findOne({ email });
        if (!existingAdmin) {
            return res.status(409).json({
                message: "Admin does not exist , please register"
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, existingAdmin.password)
        if (!isPasswordMatched) {
            return res.status(409).json({
                message: "Invalid password"
            })
        }


        return res.status(200).json({
            message: "Admin Login Successfull",
            data: existingAdmin
        })


    } catch (err) {
        console.error('Server Error:', err);
        return res.status(500).json({
            message: "Server error. Please try again later."
        });
    }
}

export const getAdmin = async (req , res) => {
    const adminId = req.params.adminId;

    if(!adminId){
        return res.status(403).json({
            message : "Please pass in the adminId"
        })
    }

    const admin = await Admin.findById(adminId);

    if(!admin){
        return req.status(403).json({
            message : "Admin does not exists"
        })
    }

    return res.status(200).json({
        message : "admin found",
        data : admin
    })
}

export const setGSTAndFee = async (req, res) => {

    try {
        const adminId = req.params.adminId;
        const { gst, platformFee } = req.body;

        if (gst == null || platformFee == null) {
            return res.status(403).json({
                message: "Please send gst and patformfee"
            })
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, {
            $set: {
                gst: gst,
                platformFee: platformFee
            } 
        } , { new: true })

        if (updatedAdmin) {
            return res.status(200).json({
                message: "Admin updated with gst and platform fee",
                updatedAdmin
            })
        }
    } catch (err) {
        console.error('Server Error:', err);
        return res.status(500).json({
            message: "Server error. Please try again later."
        });

    }
}

// src/controllers/adminConfigController.js
import AdminConfig from '../models/AdminConfig.js';

export const updateAdminConfig = async (req, res) => {
  try {
    const { gst, platformFee } = req.body;

    if (gst === undefined || platformFee === undefined) {
      return res.status(400).json({ message: 'GST and Platform Fee are required' });
    }

    const updatedConfig = await AdminConfig.findOneAndUpdate(
      {}, // only one document ever
      { gst, platformFee },
      { new: true, upsert: true } // create if not exist
    );

    res.status(200).json({
      message: 'Admin configuration updated successfully.',
      config: updatedConfig
    });
  } catch (error) {
    console.error('Error updating admin config:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


// In adminConfigController.js
export const getAdminConfig = async (req, res) => {
  try {
    const config = await AdminConfig.findOne();

    if (!config) {
      return res.status(404).json({ message: 'Admin config not found' });
    }

    res.status(200).json(config);
  } catch (error) {
    console.error('Error fetching admin config:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
