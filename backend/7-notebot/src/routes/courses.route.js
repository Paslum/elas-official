const controller = require("../controllers/course.controller");

/***************** START: INITIALIZE ROUTER MODULE *****************
 * @documentation
 * The code `let courseRouter = require("express").Router();`
 * is creating a new instance of the Express Router.
 * The 'userRouter' in this example is acting like
 * a middleware function that allows you to define routes
 * for your application. Make sure to define the middleware,
 * in this case 'userRouter.use()' function is used to
 * define middleware.
 */
let courseRouter = require("express").Router();

courseRouter.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
});

/***************** END: INITIALIZE ROUTER MODULE *****************/

/***************** START: CREATE ROUTES **************************
 * @documentation
 * When creating a route, you need to define the HTTP method
 * and the path. The HTTP method can be any of the following:
 * GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS.
 * In the example below, 'userRouter' is used to define the
 * routes. The 'userRouter.get()' method is used to define a
 * GET route. The first parameter '/users/:userId' is the path and
 * the second parameter 'controller.saveUser' is the controller
 * function. ":userId" is a parameter send through the url
 * The controller function is define in the 'user.controller.js'
 * file under controllers folder.
 */
courseRouter.get('/courses', controller.getAllCourses); // Currently not used
courseRouter.get('/course/:user_id', controller.getCoursesByUserId); // Get all Courses by UserId
courseRouter.get('/course/search/:searchParam', controller.getCoursesByTitle); // Search Courses by Title

courseRouter.post('/course', controller.createCourse); // AddCourse buttons

courseRouter.put('/course/update', controller.updateCourse) //Change Course title

courseRouter.delete('/course/delete/:course_id', controller.deleteCourse); // Deleting a Course by _id

//export the router
module.exports = courseRouter;