const controller = require("../controllers/widget.controller");

/***************** START: INITIALIZE ROUTER MODULE *****************
 * @documentation
 * The code `let widgetRouter = require("express").Router();`
 * creates a new instance of the Express Router named 'widgetRouter'.
 * This instance acts as a middleware function allowing the definition
 * of routes for the application. Middleware can be defined using
 * 'widgetRouter.use()' function, as shown here.
 */
let widgetRouter = require("express").Router();

widgetRouter.use(function (req, res, next) {
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
 * In this example, 'widgetRouter' is used to define the routes.
 * The 'widgetRouter.get()' method defines a GET route.
 * The first parameter '/widget/:widget' is the route path and
 * the second parameter 'controller.getWidget' is the controller
 * function responsible for handling the request.
 * ":widget" is a parameter sent through the URL.
 * The controller function is defined in the 'widget.controller.js'
 * file under the controllers folder.
 */
widgetRouter.get('/widget/:widget', controller.getWidget); // Fetch a single Widget

widgetRouter.post('/addWidget/', controller.addWidget); // Add a Widget to DB

widgetRouter.delete('/widget/delete/:widget', controller.deleteWidget); // Delete a Widget

/***************** END: CREATE ROUTES ****************************/

// Export the router
module.exports = widgetRouter;