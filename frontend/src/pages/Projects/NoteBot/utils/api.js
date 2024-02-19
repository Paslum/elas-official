import { Backend, setAuthToken } from "../../../../utils/apiConfig";

/** Users **/

// Function to get user information by user ID
export const getUserInfo = async (userId) => {
  try {
    // Request user info from the backend
    const response = await Backend.get(`/notebot/users/${userId}`);
    // Extracting message and user data from response
    const {
      data: { message, user },
    } = response;
    return { message, user };
  } catch (err) {
    // Handling errors and returning default data if server connection fails
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

/** Courses **/

// Function to get all courses
export const getAllCourses = async () => {
  try {
    // Request all courses from the backend
    const response = await Backend.get(`/notebot/courses`);
    // Extracting message and course data from response
    const {
      data: { message, course },
    } = response;
    return { message, course };
  } catch (err) {
    // Handling errors and returning default data if server connection fails
    console.log(err);
    return {
      message: "Server not connected",
      course: {
        uid: "",
        title: "",
      },
    };
  }
};

// Function to get courses by user ID
export const getCoursesByUserId = async (userId) => {
  try {
    // Request courses by user ID from the backend
    const response = await Backend.get(`/notebot/course/${userId}`);
    // Extracting message and course data from response
    const {
      data: { message, course },
    } = response;
    return { message, course };
  } catch (err) {
    // Handling errors and returning default data if server connection fails
    console.log(err);
    return {
      message: "Server not connected",
      course: {
        uid: "",
        title: "",
      },
    };
  }
};

// Function to get courses by title
export const getCoursesByTitle = async (title) => {
  try {
    // Request courses by title from the backend
    const response = await Backend.get(`/notebot/course/search/${title}`);
    // Extracting message and course data from response
    const {
      data: { message, course },
    } = response;
    return { message, course };
  } catch (err) {
    // Handling errors and returning default data if server connection fails
    console.log(err);
    return {
      message: "Server not connected",
      course: {
        uid: "",
        title: "",
      },
    };
  }
};

// Function to delete a course
export const deleteCourse = async (course_id) => {
  try {
    // Sending delete course request to the backend
    const response = await Backend.delete(`/notebot/course/delete/${course_id}`)
    const data = await response.data;

    return data.course;
  } catch (error) {
    // Handling errors
    throw new Error(`Failed to delete course. Error: ${error.message}`);
  }
};

// Function to create a course
export const createCourse = async (user, title) => {
  try {
    // Sending create course request to the backend
    const response = await Backend.post(`/notebot/course/`, { uid: user, title: title });
    const data = await response.data;

    // Processing response and returning course information
    if (data.message && data.message.includes('created successfully')) {
      const courseInfo = {
        title: title,
        courseId : data._id,
        // Add any other properties
      };
      return courseInfo;
    } else {
      throw new Error('Failed to extract course information from the response.');
    }
  } catch (error) {
    // Handling errors
    throw new Error(`Failed to create a new course. Error: ${error.message}`);
  }
};

// Function to update a course
export const updateCourse = async (courseId, title) => {
  try {
    // Sending update course request to the backend
    const response = await Backend.put(`/notebot/course/update`, { courseId: courseId, title: title })
    const data = await response.data;

    return data.course;
  } catch (error) {
    // Handling errors
    throw new Error(`Failed to update course. Error: ${error.message}`);
  }
};

/** Notes **/

// Function to get a note by note ID
export const getNoteById = async (noteId) => {
  try {
    // Request note by note ID from the backend
    const response = await Backend.get(`/notebot/note/${noteId}`);
    // Extracting message and note data from response
    const {
      data: { message, note },
    } = response;
    return { message, note };
  } catch (err) {
    // Handling errors and returning default data if server connection fails
    console.log(err);
    return {
      message: "Server not connected",
      note: {
        id: "",
        title: "",
      },
    };
  }
};

// Function to get note content by note ID
export const getNoteContentById = async (noteId) => {
  try {
    // Requesting note, course, sections, and widgets information from the backend
    const responseNote = await Backend.get(`/notebot/note/${noteId}`);
    const responseCourse = await Backend.get(`/notebot/courses`);
    const filteredCourse = responseCourse.data.course.find(course => course.notes.includes(noteId));
    const responseSections = await Backend.get(`/notebot/sections/${noteId}`);
    const responseSection = async(section) => {
      return await Backend.get(`/notebot/section/${section}`);
    };

    const responseWidget = async(widget) => {
      return await Backend.get(`/notebot/widget/${widget}`);
    };

    // Processing response data and returning note information
    const NoteInfo = {
      message: responseNote.data.message,
      title: responseNote.data.note.title,
      course: filteredCourse,
      sections: responseSections.data.sections ? await Promise.all(responseSections.data.sections.map(async section => {
        const layoutResponse = await responseSection(section);
        return {
          layout: layoutResponse.data.layout,
          widget: await Promise.all(layoutResponse.data.widgets.map(async widgetId => {
            const widgetResponse = await responseWidget(widgetId);
            return {
              data: widgetResponse.data.data,
              type: widgetResponse.data.type,
            };
          })),
        };
      })) : [],
    };

    return NoteInfo;
  } catch (error) {
    // Handling errors and returning default data if server connection fails
    console.log(error);
    return {
      message: "Server not connected",
    };
  }
};

// Function to create a note
export const createNote = async (userId, title, course, layout, widgets) => {
  try {
    // Sending create note request to the backend
    const response = await Backend.post(`/notebot/note`, { uid: userId, title: title, courseId: course });
    const data = await response.data;
    for (let i = 0; i < layout.layout.length; i++) {
      const responseSection = await Backend.post(`/notebot/addSection/${data.noteId}`, {layout: layout.layout[i].layout});
      const dataSection = await responseSection.data;
      const filteredWidgets = widgets.widget.filter(widget => widget.section === i);
      for (let j = 0; j < filteredWidgets.length || 0; j++) {
          const responseWidget = await Backend.post(`/notebot/addWidget/`, {type: filteredWidgets[j].type, data: filteredWidgets[j].data, section: dataSection.section});
      }
    }

    // Processing response and returning data
    if (data.message && data.message.includes('created successfully')) {
      return response.data;
    } else {
      throw new Error('Failed to extract note information from the response.');
    }
  } catch (error) {
    // Handling errors
    throw new Error(`Failed to create a new note. Error: ${error.message}`);
  }
};

// Function to delete a note
export const deleteNote = async (noteId) => {
  try {
    // Sending delete note request to the backend
    const response = await Backend.delete(`/notebot/note/delete/${noteId}`)
    const data = await response.data;

    return data.note;
  } catch (error) {
    // Handling errors
    throw new Error(`Failed to delete Note. Error: ${error.message}`);
  }
};

// Function to get favorite notes by user ID
export const getFavNotesByUserId = async (userId) => {
  try {
    // Request favorite notes by user ID from the backend
    const response = await Backend.get(`/notebot/favorite/${userId}`)
    const {
      data: { message, note },
    } = response;

    return { message, note };
  } catch (error) {
    // Handling errors
    throw new Error(`Failed to fetch Favorite Notes. Error: ${error.message}`);

  }
};

// Function to check if a note is favorited by a user
export const isFavNote = async (userId, note) => {
  try {
    // Checking if a note is favorited by a user
    const response = await Backend.get(`/notebot/isFavNote/?userId=${userId}&note=${note}`);
    return response.data.isFav;
  } catch (error) {
    // Handling errors
    console.log(error); // Log the error for debugging
  }
};

// Function to add a note to favorites
export const addFavNote = async (userId, note) => {
  try {
    // Sending add favorite note request to the backend
    const response = await Backend.post(`/notebot/favorite/`, { userId: userId, note: note });
    const data = await response.data;

    return data.message;
  } catch (err) {
    // Handling errors
    throw new Error(`Failed to favorite Notes. Error: ${error.message}`);
  }
}

// Function to remove a note from favorites
export const remFavNote = async (userId, note) => {
  try {
    // Sending remove favorite note request to the backend
    const response = await Backend.post(`/notebot/remfavorite/`, { userId: userId, note: note });
    const data = await response.data;

    return data.message;
  } catch (err) {
    // Handling errors
    throw new Error(`Failed to de favorite Notes. Error: ${error.message}`);
  }
}