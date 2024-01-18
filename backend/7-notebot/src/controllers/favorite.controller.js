const db = require("../models");
const favoriteModel = db.favorite;

export const getFavNotesByUserId = async (req, res) => {
    // Extract user ID from request parameters
    const userId = req.params.userId;

    try {
        // Query the database for notes with the specified userId
        const foundNotes = await favoriteModel.find({ userId: userId });

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

export const addFavNote = async  (req, res) => {
    try {
        // Create a new note instance with user ID and title
        let note = new favoriteModel({
            userId: req.body.userId,
            note: req.body.note,
        });

        // Save the new note to the database
        await note.save();

        // Send a success response
        return res.status(200).send({
            message: `Note ${req.body.note} favorited successfully!`,
        });
    } catch (err) {
        // Handle errors related to saving the note to the database
        return res.status(500).send({ message: `Error saving note to DB` });
    }
};
