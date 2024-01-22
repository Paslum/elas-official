const db = require("../models");
const widgetModel = db.widget;
const sectionModel = db.section;

export const getWidget = async (req, res) => {
    try {
        const widget = req.params.widget;

        // Query the database for a note with the specified ID
        const foundWidget = await widgetModel.findOne({ _id: widget });
        // Check if a note was found
        if (foundWidget) {
            // Send a success response with the found note
            return res.status(200).send({
                message: `Widgets found!`,
                type: foundWidget.type,
                data: foundWidget.data,
            });
        }
        // Send a response indicating no note was found
        return res.status(200).send({ message: `No Data found!` });
    } catch (Error) {
        return res.status(500).send({ message: `Error fetching Data` });
    }
};

export const addWidget = async (req, res) => {
    try {
        // Create a new note instance with user ID and title
        let widget = new widgetModel({
            type: req.body.type,
            data: req.body.data,
        });

        // Save the new note to the database
        await widget.save();

        try {
            const foundSection = await sectionModel.findOne({ _id: req.body.section });

            // If the course exists, update it to include the new note
            if (foundSection) {
                await sectionModel.updateOne({ _id: req.body.section }, { $push: { widgets: widget._id.toString() } });
            }
        } catch (err) {
            // Handle errors related to saving the note to a course
            return res.status(500).send({ message: `Widget saved but error saving widget to section` });
        }

        // Send a success response
        return res.status(200).send({
            message: `Widget ${widget} created successfully!`,
        });
    } catch (err) {
        // Handle errors related to saving the note to the database
        return res.status(500).send({ message: `Error saving widget to DB` });
    }
};

export const deleteWidget = async (req, res) => {
    try {
        const foundWidget = await widgetModel.findOne({ _id: req.params.widget });

        // If the course exists, update it to include the new note
        if (foundWidget) {
            await widgetModel.deleteOne({ _id: req.params.widget });

            await sectionModel.updateMany({}, { $pull: { widgets: req.params.widget } });

            return res.status(200).send({ message: `Widget deleted!` });
        }
        return res.status(500).send({ message: `Widget not found` });
    } catch (err) {
        // Handle errors related to saving the note to a course
        return res.status(500).send({ message: `Widget couldn't be deleted` });
    }
};