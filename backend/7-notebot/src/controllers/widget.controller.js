const db = require("../models");
const widgetModel = db.widget;
const sectionModel = db.section;

/***************** START: WIDGET MANAGEMENT*****************
 * @documentation
 *
 * @function getWidget
 * The `getWidget` function is an asynchronous function that retrieves
 * details of a specific widget by its ID. It queries the database for
 * a widget with the specified ID and sends a response with the widget
 * details if found, or a message indicating that no data was found.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and
 * a message. If a widget is found, it includes the widget details in
 * the response.
 */
export const getWidget = async (req, res) => {
    try {
        const widget = req.params.widget;

        // Query the database for a widget with the specified ID
        const foundWidget = await widgetModel.findOne({ _id: widget });
        // Check if a widget was found
        if (foundWidget) {
            // Send a success response with the found widget
            return res.status(200).send({
                message: `Widgets found!`,
                type: foundWidget.type,
                data: foundWidget.data,
            });
        }
        // Send a response indicating no widget was found
        return res.status(200).send({ message: `No Data found!` });
    } catch (Error) {
        return res.status(500).send({ message: `Error fetching Data` });
    }
};

/**
 * @function addWidget
 * The `addWidget` function is an asynchronous function that adds a new
 * widget to the database. It creates a new widget instance based on the
 * provided request body, saves it to the database, and updates the associated
 * section if specified. It then sends a success response or an error message
 * based on the operation's result.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and a message
 * indicating the success or failure of the operation.
 */
export const addWidget = async (req, res) => {
    try {

        // Create a new widget instance
        let widget = new widgetModel({
            type: req.body.type,
            data: req.body.data,
        });
        // Save the new widget to the database
        await widget.save();
        try {
            const foundSection = await sectionModel.findOne({ _id: req.body.section });
            // If Section exists, update it and add widgetId
            if (foundSection) {
                await sectionModel.updateOne({ _id: req.body.section }, { $push: { widgets: widget._id.toString() } });
            }

        } catch (err) {
            // Handle errors related to saving the widget to Section
            return res.status(500).send({ message: `Widget saved but error saving widget to section` });
        }

        // Send a success response
        return res.status(200).send({
            message: `Widget ${widget} created successfully!`,
        });
    } catch (err) {
        // Handle errors related to saving the widget to the database
        return res.status(500).send({ message: `Error saving widget to DB` });
    }
};

/**
 * @function deleteWidget
 * The `deleteWidget` function is an asynchronous function that deletes
 * a widget from the database by its ID. It also updates the associated
 * sections to remove the reference to the deleted widget. It sends a
 * success message if the deletion is successful, or an error message
 * if the widget is not found or if there are issues during deletion.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and
 * a message indicating the success or failure of the operation.
 */
export const deleteWidget = async (req, res) => {
    try {
        const foundWidget = await widgetModel.findOne({ _id: req.params.widget });

        // If the widget exists, delete it
        if (foundWidget) {
            await widgetModel.deleteOne({ _id: req.params.widget });

            await sectionModel.updateMany({}, { $pull: { widgets: req.params.widget } });

            return res.status(200).send({ message: `Widget deleted!` });
        }
        return res.status(500).send({ message: `Widget not found` });
    } catch (err) {
        // Handle errors related to deleting Widget from Section
        return res.status(500).send({ message: `Widget couldn't be deleted` });
    }
};