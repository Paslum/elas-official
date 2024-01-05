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
const Course = new Schema({
  userId: { type: String, required: true},
  title: { type: String, required: true },
  notes: [{ type: Schema.Types.ObjectId, ref:'note' },],
});
/***************** END: DEFINE A SCHEMA *****************/

module.exports = mongoose.model("course", Course);

