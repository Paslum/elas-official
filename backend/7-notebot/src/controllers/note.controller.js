const db = require("../models");
const noteModel = db.note;
const courseModel = db.course;

// Get user notes by uid
export const getNotesByUserId = async (req, res) => {
    const user_id = req.params.userId;
    try {
        const foundNotes = await noteModel.find({userId: user_id});
        if (foundNotes) {
            return res.status(200).send({message: `Notes found!`, note: foundNotes.map((note) => note.toObject({ getters: true}))});
        }
        return res.status(200).send({message: `No Notes found!`});
    } catch (err) {
        return res.status(500).send({ message: `Error saving user to your MongoDB database` });
    }
};

//Get Note by Id
export const getNoteById = async (req, res) => {
  const noteId = req.params.noteId;
  try {
      const foundNote = await noteModel.findOne({_id: noteId});
      if (foundNote) {
          return res.status(200).send({message: `Note found!`, note: foundNote});
      }
      return res.status(200).send({message: `No Note found!`});
  } catch (err) {
      return res.status(500).send({ message: `Error saving user to your MongoDB database` });
  }
};

//Delete course by id
export const deleteNote = async (req, res) => {
    const noteId = req.params.noteId;
    try {
        const foundNote = await noteModel.findOne({_id: noteId});
        if (foundNote) {
            await noteModel.deleteOne({_id: noteId});
            console.log(noteId);
            await courseModel.updateMany({}, {$pull: {notes: noteId}});
            return res.status(200).send({message: `Note deleted!`});
        }
        return res.status(500).send({ message: `Cannot delete Note! Note does not exist.` });
    } catch (err) {
        return res.status(500).send({ message: `Couldn't delete Note!` });
    }
};

//Create a new note
export const createNote = async (req, res) => {
    try {
        let note = new noteModel({
            userId: req.body.uid,
            title: req.body.title,
        });
        await note.save();
        try { //Adding NoteId to a course
            const courseId = req.body.courseId;
            const foundCourse = await courseModel.findOne({_id: courseId});
            if (foundCourse) {
                await courseModel.updateOne({_id: courseId}, {$push: {notes: note._id.toString()}});
            }
        } catch (err) {
            return res.status(500).send({ message: `Note saved but error saving note to Course`});
        }
        return res.status(200).send({
            message: `Note ${req.body.title} created successfully!`,
        });
    } catch (err) {
        return res.status(500).send({ message: `Error saving note to DB`});
    }
};