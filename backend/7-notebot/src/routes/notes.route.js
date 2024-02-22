const controller = require("../controllers/note.controller");

/***************** START: INITIALIZE ROUTER MODULE *****************
 * @documentation
 * The code `let noteRouter = require("express").Router();`
 * creates a new instance of the Express Router named 'noteRouter'.
 * This instance acts as a middleware function allowing the definition
 * of routes for the application. Middleware can be defined using
 * 'noteRouter.use()' function, as shown here.
 */
let noteRouter = require("express").Router();

noteRouter.use(function (req, res, next) {
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
 * In this example, 'noteRouter' is used to define the routes.
 * Various HTTP methods are used to define routes for different
 * functionalities related to notes.
 * The controller functions are defined in the 'note.controller.js'
 * file under the controllers folder.
 */
noteRouter.get('/notes/:userId', controller.getNotesByUserId); // Get all Notes by UserId
noteRouter.get('/note/:noteId', controller.getNoteById); // Get a single Note by NoteId
noteRouter.get('/sections/:noteId', controller.getSections); // Get sections of a note

noteRouter.post('/note', controller.createNote); // Create a new note

noteRouter.put('/note/update', controller.updateNote); // Update note title

noteRouter.delete('/note/delete/:noteId', controller.deleteNote); // Delete a note by NoteId

/***************** END: CREATE ROUTES ****************************/

// Export the router
module.exports = noteRouter;