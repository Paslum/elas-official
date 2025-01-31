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
const Widget = new Schema({
  type: { type: String, required: true },
  data: { type: String},
  layout_index: { type: Number },
});
/***************** END: DEFINE A SCHEMA *****************/

module.exports = mongoose.model("widget", Widget);