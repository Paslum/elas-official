const controller = require("../controllers/section.controller");

/***************** START: INITIALIZE ROUTER MODULE *****************
 * @documentation
 * The code `let sectionRouter = require("express").Router();`
 * creates a new instance of the Express Router named 'sectionRouter'.
 * This instance acts as a middleware function allowing the definition
 * of routes for the application. Middleware can be defined using
 * 'sectionRouter.use()' function, as shown here.
 */
let sectionRouter = require("express").Router();

sectionRouter.use(function (req, res, next) {
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
 * In this example, 'sectionRouter' is used to define the routes.
 * The 'sectionRouter.get()' method defines a GET route.
 * The first parameter '/section/:section' is the route path and
 * the second parameter 'controller.getSection' is the controller
 * function responsible for handling the request.
 * ":section" is a parameter sent through the URL.
 * The controller functions are defined in the 'section.controller.js'
 * file under the controllers folder.
 */
sectionRouter.get('/section/:section', controller.getSection); // Get section info by section ID
sectionRouter.get('/widgets/:section', controller.getWidgets); // Get widgets of a section

sectionRouter.post('/addSection/:note', controller.addSection); // Add a new section to a note

sectionRouter.delete('/section/delete/:section', controller.deleteSection); // Delete a section

/***************** END: CREATE ROUTES ****************************/

// Export the router
module.exports = sectionRouter;
