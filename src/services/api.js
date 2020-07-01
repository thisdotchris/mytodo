import axios from "axios";

const apiurl = process.env.API_URL || "http://localhost:3000/mytodo/v1";
const authurl = process.env.AUTH_URL || "http://localhost:3000/auth";

export function getUsers() {
  return axios.get(`${apiurl}/users`);
}

export function getUserCategory(id) {
  return axios.get(`${apiurl}/users/category/${id}`);
}

export function createUser(user) {
  return axios.post(`${apiurl}/users`, user);
}

export function updateUser(user) {
  return axios.put(`${apiurl}/users`, user);
}

export function removeUser(_id) {
  return axios.delete(`${apiurl}/users/${_id}`);
}

export function getCategories(query) {
  return axios.post(`${apiurl}/categories`, query);
}

export function createCategory(category) {
  return axios.post(`${apiurl}/categories`, category);
}

export function updateCategory(category) {
  return axios.put(`${apiurl}/categories`, category);
}

export function removeCategory(_id) {
  return axios.delete(`${apiurl}/categories/${_id}`);
}

export function getTodos() {
  return axios.get(`${apiurl}/todos`);
}

export function createTodo(todo) {
  return axios.post(`${apiurl}/todos`, todo);
}

export function updateTodo(todo) {
  return axios.put(`${apiurl}/todos`, todo);
}

export function removeTodo(_id) {
  return axios.delete(`${apiurl}/todos/${_id}`);
}

export function auth(username, password) {
  return axios.post(authurl, { username, password });
}

export function reset(username, password) {
  return axios.post(`${apiurl}/users/reset`, { username, password });
}

export function getTodosByCategoryAndUser(category, user) {
  return axios.get(`${apiurl}/todos/category/${category}/user/${user}`);
}

export function getTodosDeleted(user) {
  return axios.get(`${apiurl}/todos/deleted/user/${user}`);
}

export function getTodosDaily(user) {
  return axios.get(`${apiurl}/todos/daily/user/${user}`);
}

export function getTodosDone(user) {
  return axios.get(`${apiurl}/todos/done/user/${user}`);
}

export function getTodosFav(user) {
  return axios.get(`${apiurl}/todos/fav/user/${user}`);
}

export function getStat(user) {
  return axios.get(`${apiurl}/todos/stat/user/${user}`);
}
