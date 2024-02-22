const controller = require("../controllers/course.controller");

/***************** START: INITIALIZE ROUTER MODULE *****************
 * @documentation
 * The code `let courseRouter = require("express").Router();`
 * creates a new instance of the Express Router named 'courseRouter'.
 * This instance acts as a middleware function allowing the definition
 * of routes for the application. Middleware can be defined using
 * 'courseRouter.use()' function, as shown here.
 */
let courseRouter = require("express").Router();

courseRouter.use(function (req, res, next) {
    // Middleware function to set Access-Control-Allow-Headers header
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next(); // Passing control to the next middleware
});

/***************** END: INITIALIZE ROUTER MODULE *****************/

/***************** START: CREATE ROUTES **************************
 * @documentation
 * When creating a route, you need to define the HTTP method
 * and the path. The HTTP method can be any of the following:
 * GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS.
 * In this example, 'courseRouter' is used to define the routes.
 * Various HTTP methods are used to define routes for different
 * functionalities related to courses.
 * The controller functions are defined in the 'course.controller.js'
 * file under the controllers folder.
 */
courseRouter.get('/courses', controller.getAllCourses); // Currently not used
courseRouter.get('/course/:user_id', controller.getCoursesByUserId); // Get all Courses by UserId
courseRouter.get('/course/search/:searchParam', controller.getCoursesByTitle); // Search Courses by Title

courseRouter.post('/course', controller.createCourse); // Create a new course

courseRouter.put('/course/update', controller.updateCourse); // Update course title

courseRouter.delete('/course/delete/:course_id', controller.deleteCourse); // Delete a course by course_id

/***************** END: CREATE ROUTES ****************************/

// Export the router
module.exports = courseRouter;