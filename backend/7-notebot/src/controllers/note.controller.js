const db = require("../models");
const noteModel = db.note;
const courseModel = db.course;

/**
 * @function getNotesByUserId
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Promise representing the result of the operation
 * @description Fetches notes from the database based on the provided userId.
 */
export const getNotesByUserId = async (req, res) => {
    // Extract user ID from request parameters
    const userId = req.params.userId;

    try {
        // Query the database for notes with the specified userId
        const foundNotes = await noteModel.find({ userId: userId });

        // Check if notes were found
        if (foundNotes.length > 0) {
            // Send a success response with the found notes
            return res.status(200).send({
                message: `Notes found!`,
                note: foundNotes.map((note) => note.toObject({ getters: true }))
            });
        }

        // Send a response indicating no notes were found
        return res.status(200).send({ message: `No Notes found!` });
    } catch (err) {
        // Send a response indicating a server error occurred
        return res.status(500).send({ message: `Error fetching notes from the database` });
    }
};
/**
 * @function getNoteById
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Promise representing the result of the operation
 * @description Fetches a single note from the database based on the provided note ID.
 */
export const getNoteById = async (req, res) => {
    // Extract note ID from request parameters
    const noteId = req.params.noteId;

    try {
        // Query the database for a note with the specified ID
        const foundNote = await noteModel.findOne({ _id: noteId });

        // Check if a note was found
        if (foundNote) {
            // Send a success response with the found note
            return res.status(200).send({
                message: `Note found!`,
                note: foundNote.toObject({ getters: true })
            });
        }

        // Send a response indicating no note was found
        return res.status(200).send({ message: `No Note found!` });
    } catch (err) {
        // Send a response indicating a server error occurred
        return res.status(500).send({ message: `Error fetching note from the database` });
    }
};
/**
 * @function deleteNote
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Promise representing the result of the operation
 * @description Deletes a note from the database based on the provided note ID.
 */
export const deleteNote = async (req, res) => {
    // Extract note ID from request parameters
    const noteId = req.params.noteId;

    try {
        // Check if the note exists in the database
        const foundNote = await noteModel.findOne({ _id: noteId });

        // If the note exists, delete it and update associated courses
        if (foundNote) {
            // Delete the note
            await noteModel.deleteOne({ _id: noteId });

            // Update associated courses to remove the reference to the deleted note
            await courseModel.updateMany({}, { $pull: { notes: noteId } });

            // Send a success response
            return res.status(200).send({ message: `Note deleted!` });
        }

        // Send a response indicating that the note does not exist
        return res.status(500).send({ message: `Cannot delete Note! Note does not exist.` });
    } catch (err) {
        // Send a response indicating a server error occurred
        return res.status(500).send({ message: `Couldn't delete Note!` });
    }
};
/**
 * @function createNote
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Promise representing the result of the operation
 * @description Creates a new note and associates it with a user and a course (if provided).
 */
export const createNote = async (req, res) => {
    try {
        // Create a new note instance with user ID and title
        let note = new noteModel({
            userId: req.body.uid,
            title: req.body.title,
        });

        // Save the new note to the database
        await note.save();

        try {
            // Check if a course ID is provided in the request
            const courseId = req.body.courseId;

            // If a course ID is provided, associate the note with the course
            if (courseId) {
                const foundCourse = await courseModel.findOne({ _id: courseId });

                // If the course exists, update it to include the new note
                if (foundCourse) {
                    await courseModel.updateOne({ _id: courseId }, { $push: { notes: note._id.toString() } });
                }
            }
        } catch (err) {
            // Handle errors related to saving the note to a course
            return res.status(500).send({ message: `Note saved but error saving note to Course` });
        }

        // Send a success response
        return res.status(200).send({
            message: `Note ${req.body.title} created successfully!`,
        });
    } catch (err) {
        // Handle errors related to saving the note to the database
        return res.status(500).send({ message: `Error saving note to DB` });
    }
};
