const db = require("../models");
const sectionModel = db.section;
const noteModel = db.note;

export const getSection = async (req, res) => {
    try {
        const section = req.params.section;

        // Query the database for a note with the specified ID
        const foundSection = await sectionModel.findOne({ _id: section });
        // Check if a note was found
        if (foundSection.layout.length > 0) {
            // Send a success response with the found note
            return res.status(200).send({
                message: `Widgets(s) found!`,
                layout: foundSection.layout,
                widgets: foundSection.widgets,
            });
        }
        // Send a response indicating no note was found
        return res.status(200).send({ message: `No Widgets found!` });
    } catch (Error) {
        return res.status(500).send({ message: `Error fetching Widgets` });
    }
};

export const addSection = async (req, res) => {
    try {
        // Create a new note instance with user ID and title
        let section = new sectionModel({
            note: req.params.note,
            layout: req.body.layout,
        });

        // Save the new note to the database
        await section.save();

        try {
            const foundNote = await noteModel.findOne({ _id: req.params.note });

            // If the course exists, update it to include the new note
            if (foundNote) {
                await noteModel.updateOne({ _id: req.params.note }, { $push: { sections: section._id.toString() } });
            }
        } catch (err) {
            // Handle errors related to saving the note to a course
            return res.status(500).send({ message: `Note saved but error saving section to Note` });
        }

        // Send a success response
        return res.status(200).send({
            message: `Section ${section} created successfully!`,
        });
    } catch (err) {
        // Handle errors related to saving the note to the database
        return res.status(500).send({ message: `Error saving section to DB` });
    }
};

export const deleteSection = async (req, res) => {
    try {
        const foundSection = await sectionModel.findOne({ _id: req.params.section });

        // If the course exists, update it to include the new note
        if (foundSection) {
            await sectionModel.deleteOne({ _id: req.params.section });

            await noteModel.updateMany({}, { $pull: { sections: req.params.section } });

            return res.status(200).send({ message: `Section deleted!` });
        }
        return res.status(500).send({ message: `Section not found` });
    } catch (err) {
        // Handle errors related to saving the note to a course
        return res.status(500).send({ message: `Section couldn't be deleted` });
    }
};

export const getWidgets = async (req, res) => {
    try {
        const section = req.params.section;
        // Query the database for a note with the specified ID
        const foundSection = await sectionModel.findOne({ _id: section });
        // Check if a note was found
        if (foundSection.widgets.length > 0) {
            // Send a success response with the found note
            return res.status(200).send({
                message: `Widgets(s) found!`,
                widgets: foundSection.widgets,
            });
        }
        // Send a response indicating no note was found
        return res.status(200).send({ message: `No Widget found!` });
    } catch (Error) {
        return res.status(500).send({ message: `Error fetching Widgets` });
    }
};