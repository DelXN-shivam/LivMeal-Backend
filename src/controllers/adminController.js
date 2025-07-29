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
            data : existingAdmin
        })


    } catch (err) {
        console.error('Server Error:', err);
        return res.status(500).json({
            message: "Server error. Please try again later."
        });
    }
}