const db = require("../models");
const noteModel = db.note;
const courseModel = db.course;

/***************** START: NOTE MANAGEMENT API *****************
 * @documentation
 *
 * @function getNotesByUserId
 * The `getNotesByUserId` function is an asynchronous function that retrieves
 * notes associated with a specific user ID from the database. It queries the
 * database for notes with the specified user ID and sends a response with the
 * found notes if available, or a message indicating that no notes were found.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and a message.
 * If notes are found, it includes the notes in the response.
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
                notes: foundNotes.map((note) => ({
                    _id: note._id,
                    user_id: note.userId,
                    title: note.title,
                    favorites: note.favorites,
                })),
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
 * The `getNoteById` function is an asynchronous function that retrieves
 * a single note from the database based on the provided note ID. It queries
 * the database for a note with the specified ID and sends a response with
 * the found note if available, or a message indicating that no note was found.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and a message.
 * If a note is found, it includes the note in the response.
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
                note: {
                    _id: foundNote._id,
                    user_id: foundNote.userId,
                    title: foundNote.title,
                    favorites: foundNote.favorites,
                }
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
 * The `deleteNote` function is an asynchronous function that deletes a
 * note from the database based on the provided note ID. It also updates
 * associated courses to remove the reference to the deleted note. It sends
 * a success message if the deletion is successful, or an error message
 * if the note is not found or if there are issues during deletion.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and
 * a message indicating the success or failure of the operation.
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
 * The `createNote` function is an asynchronous function that creates
 * a new note and saves it to the database. It associates the note with
 * a user and a course if provided. It sends a success message if the
 * creation is successful, or an error message if there are issues during
 * creation.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and
 * a message indicating the success or failure of the operation.
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
            noteId: note._id,
        });
    } catch (err) {
        // Handle errors related to saving the note to the database
        return res.status(500).send({ message: `Error saving note to DB` });
    }
};

/**
 * @function getSections
 * The `getSections` function is an asynchronous function that retrieves
 * sections associated with a specific note by its ID. It queries the
 * database for a note with the specified ID and sends a response with
 * the sections if found, or a message indicating that no sections were found.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and
 * a message. If sections are found, it includes the sections in the response.
 */
export const getSections = async (req, res) => {
    try {
        const noteId = req.params.noteId;

        // Query the database for a note with the specified ID
        const foundNote = await noteModel.findOne({ _id: noteId });
        // Check if a note was found
        if (foundNote.sections.length > 0) {
            // Send a success response with the found sections
            return res.status(200).send({
                message: `Section(s) found!`,
                sections: foundNote.sections,
            });
        }
        // Send a response indicating no sections were found
        return res.status(200).send({ message: `No Section found!` });
    } catch (Error) {
        return res.status(500).send({ message: `Error fetching Sections` });
    }
};

/**
 * @function updateNote
 * The `updateNote` function is an asynchronous function that updates
 * the details of a note in the database based on the provided note ID.
 * It updates the note's title. It sends a success message if the update
 * is successful, or an error message if the note is not found or if there
 * are issues during the update.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and
 * a message indicating the success or failure of the operation.
 */
export const updateNote = async (req, res) => {
    const noteId = req.body.noteId;
    const title = req.body.title;
    try {
        const foundNote = await noteModel.findOne({_id: noteId});
        if (foundNote) {
            await noteModel.updateOne({_id: noteId}, {$set: {title: title}});
            try {
                //Remove note from previous course
                await courseModel.updateMany({}, { $pull: { notes: noteId } });

                // Check if a course ID is provided in the request
                const courseId = req.body.course;
                // If a course ID is provided, associate the note with the course
                if (courseId) {
                    const foundCourse = await courseModel.findOne({ _id: courseId });

                    // If the course exists, update it to include the new note
                    if (foundCourse) {
                        await courseModel.updateOne({ _id: courseId }, { $push: { notes: noteId } });
                    }
                }
            } catch (err) {
                // Handle errors related to saving the note to a course
                return res.status(500).send({ message: `Note saved but error saving note to Course` });
            }
            return res.status(200).send({message: `Note ${noteId} has been updated successfully`});
        } return res.status(500).send({message: `Note ${noteId} does not exist`})
    } catch (err) {
        return res.status(500).send({ message: `Error updating note ${noteId}`});
    }
};
