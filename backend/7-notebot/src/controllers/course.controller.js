const db = require("../models");
const courseModel = db.course;

/***************** START: COURSE MANAGEMENT API *****************
 * @documentation
 *
 * @function getAllCourses
 * The `getAllCourses` function is an asynchronous function that retrieves
 * all courses from the database and sends a response with the found courses
 * or a message indicating that no courses were found.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and
 * a message indicating the success or failure of fetching courses.
 */
export const getAllCourses = async (req, res) => {
    try {
        const foundCourses = await courseModel.find();
        if (foundCourses) {
            return res.status(200).send({
                message: `Courses found!`,
                course: foundCourses.map((course) => course.toObject({ getters: true }))
            });
        }
        return res.status(200).send({ message: `No Courses found!` });
    } catch (err) {
        return res.status(500).send({ message: `Fetching courses failed, please try again later.` });
    }
};

/**
 * @function getCoursesByUserId
 * The `getCoursesByUserId` function is an asynchronous function that retrieves
 * courses associated with a specific user ID from the database and sends a response
 * with the found courses or a message indicating that no courses were found.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and
 * a message indicating the success or failure of fetching courses by user ID.
 */
export const getCoursesByUserId = async (req, res) => {
    const userId = req.params.user_id;
    try {
        const foundCourses = await courseModel.find({ userId: userId });
        if (foundCourses) {
            return res.status(200).send({
                message: `Courses found!`,
                course: foundCourses.map((course) => course.toObject({ getters: true }))
            });
        }
        return res.status(200).send({ message: `No Courses found!` });
    } catch (err) {
        return res.status(500).send({ message: `Error fetching courses from the database` });
    }
};

/**
 * @function getCoursesByTitle
 * The `getCoursesByTitle` function is an asynchronous function that retrieves
 * courses from the database based on the provided title search parameter and
 * sends a response with the found courses or a message indicating that no
 * courses were found matching the search parameter.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and
 * a message indicating the success or failure of fetching courses by title.
 */
export const getCoursesByTitle = async (req, res) => {
    const searchParam = req.params.searchParam;
    try {
        const foundCourses = await courseModel.find({ title: { $regex: searchParam } });
        if (foundCourses) {
            return res.status(200).send({
                message: `Courses found!`,
                course: foundCourses.map((course) => course.toObject({ getters: true }))
            });
        }
        return res.status(200).send({ message: `No Courses found!` });
    } catch (err) {
        return res.status(500).send({ message: `Error fetching courses from the database` });
    }
};

/**
 * @function deleteCourse
 * The `deleteCourse` function is an asynchronous function that deletes a course
 * from the database based on the provided course ID and sends a response indicating
 * the success or failure of the deletion operation.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and
 * a message indicating the success or failure of deleting the course.
 */
export const deleteCourse = async (req, res) => {
    const course_id = req.params.course_id;
    try {
        const foundCourse = await courseModel.findOne({ _id: course_id });
        if (foundCourse) {
            await courseModel.deleteOne({ _id: course_id });
            return res.status(200).send({ message: `Course deleted!` });
        }
        return res.status(500).send({ message: `Cannot delete Course! Course does not exist.` });
    } catch (err) {
        return res.status(500).send({ message: `Couldn't delete Course!` });
}
};

/**
 * @function createCourse
 * The `createCourse` function is an asynchronous function that creates a new course
 * and saves it to the database, then sends a response indicating the success or failure
 * of the creation operation.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and
 * a message indicating the success or failure of creating the course.
 */
export const createCourse = async (req, res) => {
    try {
        let course = new courseModel({
            userId: req.body.uid,
            title: req.body.title,
        });
        await course.save();
        return res.status(200).send({
            message: `Course ${req.body.title} created successfully!`,
            _id: course._id,
        });
    } catch (err) {
        return res.status(500).send({ message: `Error saving course to DB` });
    }
};

/**
 * @function updateCourse
 * The `updateCourse` function is an asynchronous function that updates the title of a course
 * based on the provided course ID and sends a response indicating the success or failure
 * of the update operation.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and
 * a message indicating the success or failure of updating the course.
 */
export const updateCourse = async (req, res) => {
    const courseId = req.body.courseId;
    try {
        const foundCourse = await courseModel.findOne({ _id: courseId });
        if (foundCourse) {
            await courseModel.updateOne({ _id: courseId }, { $set: { title: req.body.title } });
            return res.status(200).send({ message: `Course ${courseId} has been updated` });
        }
        return res.status(500).send({ message: `Course ${courseId} does not exist` });
    } catch (err) {
        return res.status(500).send({ message: `Error updating course ${courseId}` });
    }
};
/***************** END: COURSE MANAGEMENT API ******************/