const db = require("../models");
const courseModel = db.course;

//get all courses
export const getAllCourses = async (req, res) => {
    try {
        const foundCourses = await courseModel.find(); //loading every course into const
        if (foundCourses) { //if at least one course found, return message and all courses
            return res.status(200).send({message: `Courses found!`, course: foundCourses.map((course) => course.toObject({ getters: true}))});
        } //if not return message
        return res.status(200).send({message: `No Courses found!`});
    } catch (err) {
        return res.status(500).send({message: `Fetching courses failed, please try again later.`});
    }
};

//Get courses by userId
export const getCoursesByUserId = async (req, res) => {
    const userId = req.params.user_id;
    try {
        const foundCourses = await courseModel.find({userId: userId});
        if (foundCourses) {
            return res.status(200).send({message: `Courses found!`, course: foundCourses.map((course) => course.toObject({ getters: true}))});
        }
        return res.status(200).send({message: `No Courses found!`});
    } catch (err) {
        return res.status(500).send({ message: `Error saving user to your MongoDB database` });
    }
};

//Get courses by Title -> possible search function
export const getCoursesByTitle = async (req, res) => {
    const searchParam = req.params.searchParam;
    try {
        const foundCourses = await courseModel.find({title: {$regex: searchParam}});
        if (foundCourses) {
            return res.status(200).send({message: `Courses found!`, course: foundCourses.map((course) => course.toObject({ getters: true}))});
        }
        return res.status(200).send({message: `No Courses found!`});
    } catch (err) {
        return res.status(500).send({ message: `Error saving user to your MongoDB database` });
    }
};

//Delete course by id
export const deleteCourse = async (req, res) => {
  const course_id = req.params.course_id;
  try {
      const foundCourse = await courseModel.findOne({_id: course_id});
      if (foundCourse) {
          await courseModel.deleteOne({_id: course_id});
          return res.status(200).send({message: `Course deleted!`});
      }
      return res.status(500).send({ message: `Cannot delete Course! Course does not exist.` });
  } catch (err) {
      return res.status(500).send({ message: `Couldn't delete Course!` });
  }
};

//Create a new course
export const createCourse = async (req, res) => {
    try {
        let course = new courseModel({
            userId: req.body.uid,
            title: req.body.title,
        });
        await course.save();
        return res.status(200).send({
            message: `Course ${req.body.title} created successfully!`,
        });
    } catch (err) {
        return res.status(500).send({ message: `Error saving course to DB`});
    }
};
//Change course title
export const updateCourse = async (req, res) => {
    const courseId = req.body.courseId;
    try {
        const foundCourse = await courseModel.findOne({_id: courseId});
        if (foundCourse) {
            await courseModel.updateOne({_id: courseId}, {$set: {title: req.body.title}});
            return res.status(200).send({message: `Course ${courseId} has been updated`});
        } return res.status(500).send({message: `Course ${courseId} does not exist`})
    } catch (err) {
        return res.status(500).send({ message: `Error updating course ${courseId}`});
    }
};
