import axios from "axios";


const API = axios.create({
  baseURL: "https://stack-overflow-protyush-main.onrender.com",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

// authentication
export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

// questions
export const postQuestion = (questionData) =>
  API.post("/questions/Ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value) =>
  API.patch(`/questions/vote/${id}`, { value });

// answers
export const postAnswer = (id, noOfAnswers, answerBody, userAnswered) =>
  API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered });
export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

// user
export const getAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);
export const followUser = (userId) => API.put(`/user/follow/${userId}`);
export const unfollowUser = (userId) => API.put(`/user/unfollow/${userId}`);

// posts
export const sharePost = (postData) => API.post("/post/", postData);
export const getAllPosts = () => API.get("/post/");
export const likePost = (postId) => API.put(`/post/like/${postId}`);
export const dislikePost = (postId) => API.put(`/post/dislike/${postId}`);
export const deletePost = (postId) => API.delete(`/post/${postId}`);
export const commentPost = (postId, commentText) =>
  API.put(`/post/comment/${postId}`, { comment: commentText });
