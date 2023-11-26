import { Backend } from "../../../../utils/apiConfig";

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

export const getNotes = async (token, userId) => {
  const response = await fetch(`/notebot/notes/user/${userId}`, {
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

