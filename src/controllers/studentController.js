import { Student } from "../models/Student.js";

export const studentRegister = async (req, res) => {
    try {

        const { name, email, contact, gender } = req.body;

        if (!name || !email || !contact || !gender) {
            return res.status(411).json({
                message: "please provide all the values"
            })
        }

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(409).json({
                message: "Student already registered"
            })
        }

        const newStudent = await Student.create({
            name, email, contact, gender, isRegistered: true
        })

        return res.status(200).json({
          message: "Student registered successfully",
          role: "student",
          data: newStudent,
        });

    } catch (err) {

        console.error("Server Error", err);

        return res.status(500).json({
            error: err.message
        })
    }
}

export const loginByContact = async (req, res) => {
  try {
    const contact = req.query.contact;

    if (!contact) {
      return res.json({
        message: "please provide contact",
      });
    }

    const existingStudent = await Student.findOne({ contact });
    if (!existingStudent) {
      return res.status(409).json({
        message: "Student does not exist for the given contact",
      });
    }

    return res.status(200).json({
      message: "Student found , Login successfull",
      data: existingStudent,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error during login by phone number",
      error: err.message,
    });
  }
};

export const updateById = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  // Filter out empty string or undefined fields
  const sanitizedFields = {};
  Object.entries(updateFields).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== "" &&
      !(typeof value === "object" && Object.keys(value).length === 0)
    ) {
      sanitizedFields[key] = value;
    }
  });

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { $set: sanitizedFields },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error("Error updating Student:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id)
      .populate("favorites")
      .populate("subscribedMess")
      .populate("subscription");

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    return res.status(200).json({
      message: "Student found",
      data: student,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error fetching student",
      error: err.message,
    });
  }
};
