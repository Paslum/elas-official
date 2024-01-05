const db = require("../models");
const courseModel = db.course;
const userModel = db.user;
const noteModel = require("../models/note.model"); //replace with db.*
const HttpError = require("../models/http-error.model");
const mongoose = require("mongoose");
const { json } = require("body-parser");

//get all courses : test
const getAllCourses = async (req, res, next) => {
    try {
        const courses = await courseModel.find();

        res.json({
            courses: courses.map((course) => course.toObject({ getters: true })),
        });
    } catch (err) {
        const error = new HttpError(
            "Fetching courses failed, please try again later.",
            500
        );
        return next(error);
    }
};

//Get courses by user_id
const getCoursesByUserId = async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const foundCourses = await courseModel.find({userId: user_id}).select('title');
        if (foundCourses) {
            return res.status(200).send({message: `Courses found!`, course: foundCourses.map((course) => course.toObject({ getters: true}))});
        }
        return res.status(200).send({message: `No Courses found!`});
    } catch (err) {
        return res.status(500).send({ message: `Error saving user to your MongoDB database` });
    }
};

//Delete course by id
const deleteCourse = async (req, res) => {
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
const createCourse = async (req, res) => {
    try {
        let course = new courseModel({
            userId: req.body.uid,
            title: req.body.title,
        });
        await course.save();
        res.status(200).send({
            message: `Course ${req.body.title} created successfully!`,
        });
    } catch (err) {
        res.status(500).send({ message: `Error saving course to DB`});
        return;
    };
};



exports.getAllCourses = getAllCourses;
exports.getCoursesByUserId = getCoursesByUserId;
exports.deleteCourse = deleteCourse;
exports.createCourse = createCourse;
