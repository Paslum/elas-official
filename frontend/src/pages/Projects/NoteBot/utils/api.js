import {Backend, setAuthToken} from "../../../../utils/apiConfig";

/** Users **/
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

/** Courses **/
export const getAllCourses = async () => {
  try {
    const response = await Backend.get(`/notebot/courses`);
    const {
      data: { message, course },
    } = response;
    return { message, course };
  } catch (err) {
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
export const getCoursesByUserId = async (userId) => {
  try {
    const response = await Backend.get(`/notebot/course/${userId}`);
    const {
      data: { message, course },
    } = response;
    return { message, course };
  } catch (err) {
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
export const getCoursesByTitle = async (title) => {
  try {
    const response = await Backend.get(`/notebot/course/search/${title}`);
    const {
      data: { message, course },
    } = response;
    return { message, course };
  } catch (err) {
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
export const deleteCourse = async (course_id) => {
  try {
    const response = await Backend.delete(`/notebot/course/delete/${course_id}`)
    const data = await response.data;

    return data.course;
  } catch (error) {
    throw new Error(`Failed to delete course. Error: ${error.message}`);
  }
};
export const createCourse = async (user, title) => {
  try {
    const response = await Backend.post(`/notebot/course/`, { uid: user, title: title });
    const data = await response.data;

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
    throw new Error(`Failed to create a new course. Error: ${error.message}`);
  }
};
export const updateCourse = async (courseId, title) => {
  try {
    const response = await Backend.put(`/notebot/course/update`, { courseId: courseId, title: title })
    const data = await response.data;

    return data.course;
  } catch (error) {
    throw new Error(`Failed to update course. Error: ${error.message}`);
  }
};

/** Notes **/
export const getNoteById = async (noteId) => {
  try {
    const response = await Backend.get(`/notebot/note/${noteId}`);
    const {
      data: { message, note },
    } = response;
    return { message, note };
  } catch (err) {
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

export const getNoteContentById = async (noteId) => {
  try {
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
    console.log(error);
    return {
      message: "Server not connected",
    };
  }
}

export const createNote = async (userId, title, course, layout, widgets) => {
  try {
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

    if (data.message && data.message.includes('created successfully')) {
      return response.data;
    } else {
      throw new Error('Failed to extract note information from the response.');
    }
  } catch (error) {
    throw new Error(`Failed to create a new note. Error: ${error.message}`);
  }
};

export const deleteNote = async (noteId) => {
  try {
    const response = await Backend.delete(`/notebot/note/delete/${noteId}`)
    const data = await response.data;

    return data.note;
  } catch (error) {
    throw new Error(`Failed to delete Note. Error: ${error.message}`);
  }
};

export const getFavNotesByUserId = async (userId) => {
  try {
    const response = await Backend.get(`/notebot/favorite/${userId}`)
    const {
      data: { message, note },
    } = response;

    return { message, note };
  } catch (error) {
    throw new Error(`Failed to fetch Favorite Notes. Error: ${error.message}`);

  }
};

export const isFavNote = async (userId, note) => {
  try {
    const response = await Backend.get(`/notebot/isFavNote/?userId=${userId}&note=${note}`);
    return response.data.isFav;
  } catch (error) {

  }
};

export const addFavNote = async (userId, note) => {
  try {
    const response = await Backend.post(`/notebot/favorite/`, { userId: userId, note: note });
    const data = await response.data;

    return data.message;
  } catch (err) {
    throw new Error(`Failed to favorite Notes. Error: ${error.message}`);
  }
}

export const remFavNote = async (userId, note) => {
  try {
    const response = await Backend.post(`/notebot/remfavorite/`, { userId: userId, note: note });
    const data = await response.data;

    return data.message;
  } catch (err) {
    throw new Error(`Failed to de favorite Notes. Error: ${error.message}`);
  }
}