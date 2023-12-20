import {Backend, setAuthToken} from "../../../../utils/apiConfig";

export const getUserInfo = async (userId) => {
  try {
    const response = await Backend.get(`/notebot/users/${userId}`);
    const {
      data: { message, user },
    } = response;
    return { message, user };
  } catch (err) {
    console.log(err);
    return {
      message: "Server not connected",
      user: {
        uid: "",
        name: "",
        username: "",
      },
    };
  }
};

export const getCoursesByUserId = async (user_id) => {
  try {
    const response = await Backend.get(`/getById/${user_id}`);
    const courses = response.data.courses;

    // Add the id property to each course object
    const coursesWithId = courses.map((course) => ({
      id: course._id,
      ...course,
    }));

    return coursesWithId;
  } catch (error) {
    throw new Error("Failed to fetch courses.");
  }
};

export const createCourse = async (user, title) => {
  try {
    const response = await Backend.post(`/notebot/course/`, { uid: user, title: title })
    console.log("Course title: ", title);
    const data = await response.json();

    if (response.ok) {
      return data.course;
    } else {
      throw new Error(data.message || 'Failed to create a new course.');
    }
  } catch (error) {
    throw new Error(`Failed to create a new course. Error: ${error.message}`);
  }
};

export const getNotes = async (token, userId) => {
  const response = await fetch(`/notes/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
  });

  const notes = await response.json();

  if (!response.ok) {
    let error = new Error("Http status code" + response.status);
    error.data = notes;
    error.status = response.status;
    error.message = response.message;
  }

  return notes["notes"];
};