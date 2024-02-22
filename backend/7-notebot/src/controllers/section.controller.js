const db = require("../models");
const sectionModel = db.section;
const noteModel = db.note;

/***************** START: SECTION MANAGEMENT API *****************
 * @documentation
 *
 * @function getSection
 * The `getSection` function is an asynchronous function that retrieves
 * details of a specific section by its ID. It queries the database for
 * a section with the specified ID and sends a response with the section
 * details if found, or a message indicating that no widgets were found.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and
 * a message. If widgets are found, it includes the layout and widgets
 * in the response.
 */
export const getSection = async (req, res) => {
    try {
        const section = req.params.section;

        // Query the database for a section with the specified ID
        const foundSection = await sectionModel.findOne({ _id: section });
        // Check if a section was found
        if (foundSection.layout.length > 0) {
            // Send a success response with the found section
            return res.status(200).send({
                message: `Widgets(s) found!`,
                layout: foundSection.layout,
                widgets: foundSection.widgets,
            });
        }
        // Send a response indicating no section was found
        return res.status(200).send({ message: `No Widgets found!` });
    } catch (Error) {
        return res.status(500).send({ message: `Error fetching Widgets` });
    }
};

/**
 * @function addSection
 * The `addSection` function is an asynchronous function that adds a new
 * section to the database. It creates a new section instance based on the
 * provided request body, saves it to the database, and updates the associated
 * note if specified. It then sends a success response or an error message
 * based on the operation's result.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and a message
 * indicating the success or failure of the operation.
 */
export const addSection = async (req, res) => {
    try {
        // Create a new section instance with note ID and layout
        let section = new sectionModel({
            note: req.params.note,
            layout: req.body.layout,
        });

        // Save the new section to the database
        await section.save();

        try {
            const foundNote = await noteModel.findOne({ _id: req.params.note });

            // If the note exists, update it to include the new section
            if (foundNote) {
                await noteModel.updateOne({ _id: req.params.note }, { $push: { sections: section._id.toString() } });
            }
        } catch (err) {
            // Handle errors related to saving the section to a note
            return res.status(500).send({ message: `Note saved but error saving section to Note` });
        }

        // Send a success response
        return res.status(200).send({
            message: `Section ${section} created successfully!`,
            section: section._id,
        });
    } catch (err) {
        // Handle errors related to saving the section to the database
        return res.status(500).send({ message: `Error saving section to DB` });
    }
};

/**
 * @function deleteSection
 * The `deleteSection` function is an asynchronous function that deletes
 * a section from the database by its ID. It also updates the associated
 * notes to remove the reference to the deleted section. It sends a
 * success message if the deletion is successful, or an error message
 * if the section is not found or if there are issues during deletion.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and
 * a message indicating the success or failure of the operation.
 */
export const deleteSection = async (req, res) => {
    try {
        const foundSection = await sectionModel.findOne({ _id: req.params.section });

        // If the section exists, delete it
        if (foundSection) {
            await sectionModel.deleteOne({ _id: req.params.section });

            await noteModel.updateMany({}, { $pull: { sections: req.params.section } });

            return res.status(200).send({ message: `Section deleted!` });
        }
        return res.status(500).send({ message: `Section not found` });
    } catch (err) {
        // Handle errors related to deleting section from notes
        return res.status(500).send({ message: `Section couldn't be deleted` });
    }
};

/**
 * @function getWidgets
 * The `getWidgets` function is an asynchronous function that retrieves
 * widgets associated with a specific section by its ID. It queries the
 * database for a section with the specified ID and sends a response with
 * the widgets if found, or a message indicating that no widgets were found.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and
 * a message. If widgets are found, it includes the widgets in the response.
 */
export const getWidgets = async (req, res) => {
    try {
        const section = req.params.section;
        // Query the database for a section with the specified ID
        const foundSection = await sectionModel.findOne({ _id: section });
        // Check if a section was found
        if (foundSection.widgets.length > 0) {
            // Send a success response with the found widgets
            return res.status(200).send({
                message: `Widgets(s) found!`,
                widgets: foundSection.widgets,
            });
        }
        // Send a response indicating no widgets were found
        return res.status(200).send({ message: `No Widget found!` });
    } catch (Error) {
        return res.status(500).send({ message: `Error fetching Widgets` });
    }
};
