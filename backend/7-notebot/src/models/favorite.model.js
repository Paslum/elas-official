/******
 * @Note This is one example, you can create more model files under
 * the models folder and export them. Make sure you import the models
 * in the index.js file under models folder.
 */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/***************** START: DEFINE A SCHEMA *****************
 * @documentation
 * A user schema for MongoDB.
 */
const Favorite = new Schema({
  uid: { type: mongoose.Types.ObjectId, required: true, ref:'user' },
  note: [{ type: mongoose.Types.ObjectId, required: true, ref:'note' },],
});
/***************** END: DEFINE A SCHEMA *****************/

module.exports = mongoose.model("favorite", Favorite);