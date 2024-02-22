const controller = require("../controllers/user.controller");

/***************** START: INITIALIZE ROUTER MODULE *****************
 * @documentation
 * The code `let userRouter = require("express").Router();`
 * creates a new instance of the Express Router named 'userRouter'.
 * This instance acts as a middleware function allowing the definition
 * of routes for the application. Middleware can be defined using
 * 'userRouter.use()' function, as shown here.
 */
let userRouter = require("express").Router();

userRouter.use(function (req, res, next) {
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
 * In this example, 'userRouter' is used to define the routes.
 * The 'userRouter.get()' method defines a GET route.
 * The first parameter '/users/:userId' is the route path and
 * the second parameter 'controller.getUserById' is the controller
 * function responsible for handling the request.
 * ":userId" is a parameter sent through the URL.
 * The controller function is defined in the 'user.controller.js'
 * file under the controllers folder.
 */
userRouter.get("/users/:userId", controller.getUserById); // Get userInfo by userId
userRouter.post("/users", controller.createNewUser); // Create a new user
userRouter.put("/users/:userId", controller.updateUser); // Update userInfo by userId

/***************** END: CREATE ROUTES ****************************/

module.exports = userRouter;