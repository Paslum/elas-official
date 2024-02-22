const db = require("../models");
const User = db.user;

/***************** START: GET USER INFO USING A CONTROLLER *****************
 * @documentation
 *
 * @function getUserById
 * The `getUserById` function is an asynchronous function that retrieves
 * a user from a MongoDB database based on their user ID and sends a
 * response with the user information if found, or a message indicating
 * that the user was not found.
 * @param {Object} req - The `req` parameter is an object that represents the
 * HTTP request made to the server. It contains information such as
 * the request method, headers, URL, and parameters.
 * @param {Object} res - The `res` parameter is the response object that is used
 * to send the response back to the client. It contains methods and
 * properties that allow you to control the response, such as setting
 * the status code, sending data, and setting headers.
 * @returns {Promise<void>} - a response object with a status code and a message.
 * If a user is found, it also includes the found user object in the response.
 */
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    let foundUser = await User.findOne({ uid: userId });
    if (foundUser) {
      return res.status(200).send({ message: `User found!`, user: foundUser });
    }
    return res.status(200).send({ message: `User ${userId} not found!` });
  } catch (err) {
    res
        .status(500)
        .send({ message: `Error saving user to your MongoDB database` });
    return;
  }
};
/***************** END: GET USER INFO USING A CONTROLLER ******************/

/**
 * @function createNewUser
 * The `createNewUser` function is an asynchronous function that creates
 * a new user and saves it to the database. It extracts user information
 * from the request body and sends a success message if the user is created
 * successfully, or an error message if there are issues during creation.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and
 * a message indicating the success or failure of the operation.
 */
export const createNewUser = async (req, res) => {
  try {
    let user = new User({
      uid: req.body.uid,
      name: req.body.name,
      username: req.body.username,
    });
    await user.save();
    res.status(200).send({
      message: `User ${user.username} created successfully!`,
    });
  } catch (err) {
    res.status(500).send({ message: `Error saving user to DB` });
    return;
  }
};

/**
 * @function updateUser
 * The `updateUser` function is an asynchronous function that updates
 * user details based on their user ID. It retrieves the user from the
 * database, updates the user information with the data from the request
 * body, and saves the changes. It sends a success message if the update
 * is successful, or an error message if the user is not found or if
 * there are issues during the update process.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A response object with a status code and
 * a message indicating the success or failure of the operation.
 */
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    let foundUser = await User.findOne({ uid: userId });
    console.log(foundUser);
    if (foundUser) {
      foundUser.name = req.body.name;
      foundUser.username = req.body.username;
      await foundUser.save();
      return res.status(200).send({
        message: `User details updated!`,
      });
    }
    return res.status(200).send({ message: `User not found!` });
  } catch (err) {
    res.status(500).send({ message: `Error saving user to DB.` });
    return;
  }
};
