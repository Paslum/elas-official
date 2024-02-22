const controller = require("../controllers/favorite.controller");

/***************** START: INITIALIZE ROUTER MODULE *****************
 * @documentation
 * The code `let favoriteRouter = require("express").Router();`
 * creates a new instance of the Express Router named 'favoriteRouter'.
 * This instance acts as a middleware function allowing the definition
 * of routes for the application. Middleware can be defined using
 * 'favoriteRouter.use()' function, as shown here.
 */
let favoriteRouter = require("express").Router();

favoriteRouter.use(function (req, res, next) {
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
 * In this example, 'favoriteRouter' is used to define the routes.
 * Various HTTP methods are used to define routes for different
 * functionalities related to favorites.
 * The controller functions are defined in the 'favorite.controller.js'
 * file under the controllers folder.
 */
favoriteRouter.get('/favorite/:userId', controller.getFavNotesByUserId); // Get favorite notes by UserId
favoriteRouter.get('/isFavNote/', controller.isFavNote); // Check if a note is a favorite

favoriteRouter.post('/favorite', controller.addFavNote); // Add a note to favorites
favoriteRouter.post('/remfavorite', controller.remFavNote); // Remove a note from favorites

/***************** END: CREATE ROUTES ****************************/

// Export the router
module.exports = favoriteRouter;