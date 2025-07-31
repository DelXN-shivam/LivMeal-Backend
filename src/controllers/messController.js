import Mess from "../models/Mess.js";


export const messRegister = async (req, res) => {
    try {
        const body = req.body;

        if (!body) {
            return res.status(411).json({
                message: "Please pass in the body"
            })
        }

        const existingMess = await Mess.findOne({ email: body.email });

        if (existingMess) {
            return res.status(409).json({
                message: "Mess User already exists , please login"
            })
        }

        const newMess = await Mess.create(body);

        return res.status(200).json({
            message: "New Mess User registered successfully",
            data: newMess
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error while registering Mess",
            error: err.message
        })
    }
}


export const loginByContact = async (req, res) => {
    try {
        const contact = req.query.contact;

        if (!contact) {
            return res.json({
                message: "please provide contact"
            })
        }

        const existingMess = await Mess.findOne({ contact });
        if (!existingMess) {
            return res.status(409).json({
                message: "Mess does not exist for the given contact"
            })
        }

        return res.status(200).json({
            message: "Mess found , Login successfull",
            data: existingMess
        })


    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Error during login by phone number",
            error: err.message
        })
    }
}

export const updateById = async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    // Define allowed fields from your schema
    const allowedFields = [
        'messName', 'messOwnerName', 'email', 'contact', 'messAddress',
        'mealTypes', 'messTimings', 'deliveryAvailable',
        'subscription', 'photos', 'isVerified'
    ];

    // Filter out invalid fields
    const sanitizedFields = {};
    Object.entries(updateFields).forEach(([key, value]) => {
        if (allowedFields.includes(key) && value !== undefined && value !== '' &&
            !(typeof value === 'object' && Object.keys(value).length === 0)) {
            sanitizedFields[key] = value;
        }
    });

    // Check if any valid fields were provided
    if (Object.keys(sanitizedFields).length === 0) {
        return res.status(400).json({ message: 'No valid fields provided for update' });
    }

    try {
        const updatedMess = await Mess.findByIdAndUpdate(
            id,
            { $set: sanitizedFields },
            { new: true, runValidators: true, strict: true }
        );

        if (!updatedMess) {
            return res.status(404).json({ message: 'Mess not found' });
        }

        res.status(200).json(updatedMess);
    } catch (error) {
        console.error('Error updating mess:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};


export const fetchAllMess = async (req, res) => {
    try {
        const allMesses = await Mess.find();

        if (!allMesses) {
            return res.status(411).json({
                message: "No messes found"
            })
        }

        return res.status(200).json({
            message: "Messes found",
            data: allMesses
        })
    } catch (err) {
        console.error('Server Error', err);
        return res.status(500).json({
            message: err.message
        })
    }
}

export const fetchById = async (req, res) => {
    try {
        const { id } = req.params;

        const mess = await Mess.findById(id);
        if (!mess) {
            return res.status(411).json({
                message: "Mess not found"
            })
        }

        return res.status(200).json({
            message: "Mess found",
            data: mess
        })

    } catch { err } {
        console.error('Server Error', err);
        return res.status(500).json({
            message: err.message
        })
    }
}

export const addSubscription = async (req, res) => {
    try {
        const body = req.body;

    } catch { err } {
        console.error('Server Error', err);
        return res.status(500).json({
            message: err.message
        })
    }
}