/******
 * @Note This is one example, you can create more route files under
 * the routes folder and export them. Make sure you import the routes
 * in the server.js file.
 */

const controller = require("../controllers/course.controller");

/***************** START: INITIALIZE ROUTER MODULE *****************
 * @documentation
 * The code `let userRouter = require("express").Router();`
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
courseRouter.get('/course/:user_id', controller.getCoursesByUserId); // Info of one Course
courseRouter.get('/course/search/:searchParam', controller.getCoursesByTitle); // Info of one Course
courseRouter.post('/course', controller.createCourse); // AddCourse button in the Dashboard page
courseRouter.delete('/course/delete/:course_id', controller.deleteCourse); // Clicking on the delete icon in the Courses page

courseRouter.get('/test', controller.getAllCourses); // Show more link in the Courses page

//export the router
module.exports = courseRouter;