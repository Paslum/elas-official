const db = require("../models");
const favoriteModel = db.favorite;
const noteModel = db.note;

/***************** START: FAVORITE NOTES API *****************
 * @documentation
 *
 * @function getFavNotesByUserId
 * The `getFavNotesByUserId` function is an asynchronous function that retrieves
 * favorite notes associated with a specific user ID from the database. It queries
 * the database for favorite notes with the specified user ID and sends a response
 * with the found notes if available, or a message indicating that no favorite notes
 * were found.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and a message.
 * If favorite notes are found, it includes the notes in the response.
 */
export const getFavNotesByUserId = async (req, res) => {
    // Extract user ID from request parameters
    const userId = req.params.userId;

    try {
        // Query the database for notes with the specified userId
        const foundFavNotes = await favoriteModel.find({ userId: userId });
        const foundNoteIds = foundFavNotes.flatMap((note) => note.note);
        // Check if notes were found
        if (foundNoteIds.length > 0) {
            // Send a success response with the found notes
            try {
                const foundNotes = await noteModel.find({ _id: { $in: foundNoteIds} });
                return res.status(200).send({
                    message: `Notes found!`,
                    note: foundNotes.map((note) => note.toObject({ getters: true }))
                });
            } catch (err) {
                // Send a response indicating a server error occurred
                return res.status(500).send({ message: `Error fetching notes from the database` });
            }
        }

        // Send a response indicating no notes were found
        return res.status(200).send({ message: `No Notes found!` });
    } catch (err) {
        // Send a response indicating a server error occurred
        return res.status(500).send({ message: `Error fetching notes from the database` });
    }
};

/**
 * @function isFavNote
 * The `isFavNote` function is an asynchronous function that checks if a
 * specific note is favored by a user. It queries the database for a record
 * matching the provided user ID and note ID and returns whether the note is
 * favored by the user or not.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and
 * a message indicating whether the note is favored by the user.
 */
export const isFavNote = async (req, res) => {
    try {
        const isFav = await favoriteModel.find({userId: req.query.userId, note: req.query.note});
        return res.status(200).send({
            isFav: isFav.length > 0,
        });
    } catch (error) {
        return res.status(500).send({
            message: `Error checking if note is favored`,
        });
    }
};

/**
 * @function addFavNote
 * The `addFavNote` function is an asynchronous function that adds a note
 * to a user's favorites. It first checks if the user already has favorites,
 * if yes, it updates the existing favorites, else it creates a new record
 * for the user's favorites. It also increments the favorites count for the note.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and
 * a message indicating the success or failure of adding the note to favorites.
 */
export const addFavNote = async  (req, res) => {
    try {
        const existingFavorites = await favoriteModel.find({ userId: req.body.userId });

        if (existingFavorites.length > 0) {
            await favoriteModel.updateOne({ userId: req.body.userId },{ $push: { note: req.body.note } });
        }
        else {
            let note = new favoriteModel({
                userId: req.body.userId,
                note: req.body.note,
            });

            // Save the new note to the database
            await note.save();
        }

        await noteModel.updateOne({ _id: req.body.note}, { $inc: { favorites: 1 } });
        // Send a success response
        return res.status(200).send({
            message: `Note ${req.body.note} favorited successfully!`,
        });
    } catch (err) {
        // Handle errors related to saving the note to the database
        return res.status(500).send({ message: `Error saving note to DB` });
    }
};

/**
 * @function remFavNote
 * The `remFavNote` function is an asynchronous function that removes a note
 * from a user's favorites. It first checks if the user has favorites, if yes,
 * it updates the existing favorites to remove the note. It also decrements
 * the favorites count for the note.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and
 * a message indicating the success or failure of removing the note from favorites.
 */
export const remFavNote = async (req, res) => {
    try {
        const existingFavorites = await favoriteModel.find({ userId: req.body.userId });

        if (existingFavorites.length > 0) {
            await favoriteModel.updateOne(
                { userId: req.body.userId },
                { $pull: { note: req.body.note } }
            );
        }

        await noteModel.updateOne({ _id: req.body.note }, { $inc: { favorites: -1 } });

        // Send a success response
        return res.status(200).send({
            message: `Note ${req.body.note} unfavorited successfully!`,
        });
    } catch (err) {
        // Handle errors related to updating the favorites or note count
        return res.status(500).send({ message: `Error updating favorites for note` });
    }
};
/***************** END: FAVORITE NOTES API ******************/