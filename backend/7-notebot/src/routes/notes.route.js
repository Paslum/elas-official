const controller = require("../controllers/note.controller");

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
let noteRouter = require("express").Router();

noteRouter.use(function (req, res, next) {
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

//noteRouter.get('/notes', controller.getAllNotes); //Currently not used
noteRouter.get('/notes/:userId', controller.getNotesByUserId); //Get all Notes by UserId
noteRouter.get('/note/:noteId', controller.getNoteById);
//noteRouter.get('/notes/search/:searchParam', controller.getNotesByTitle); //Search Notes by title

noteRouter.post('/note', controller.createNote); // AddNote buttons

noteRouter.delete('/note/delete/:noteId', controller.deleteNote); // Deleting a Note by _id

//export the router
module.exports = noteRouter;
