const controller = require("../controllers/widget.controller");

/***************** START: INITIALIZE ROUTER MODULE *****************
 * @documentation
 * The code `let noteRouter = require("express").Router();`
 * is creating a new instance of the Express Router.
 * The 'userRouter' in this example is acting like
 * a middleware function that allows you to define routes
 * for your application. Make sure to define the middleware,
 * in this case 'userRouter.use()' function is used to
 * define middleware.
 */
let widgetRouter = require("express").Router();

widgetRouter.use(function (req, res, next) {
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
 * The controller function is define in the 'widget.controller.js'
 * file under controllers folder.
 */

widgetRouter.get('/widget/:widget', controller.getWidget); //Fetch a single Widget

widgetRouter.post('/addWidget/', controller.addWidget); //Add a Widget to DB

widgetRouter.delete('/widget/delete/:widget', controller.deleteWidget); //Delete a Widget


//export the router
module.exports = widgetRouter;
