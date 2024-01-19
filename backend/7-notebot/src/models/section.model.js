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
const Section = new Schema({
  note: { type: String, required: true, },
  widgets: [{type: String,},],
});
/***************** END: DEFINE A SCHEMA *****************/

module.exports = mongoose.model("section", Section);