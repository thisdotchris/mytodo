import axios from "axios";

const apiurl = "http://localhost:3000/mytodo/v1";

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
  return axios.post("http://localhost:3000/auth", { username, password });
}

export function reset(username, password) {
  return axios.post(`${apiurl}/users/reset`, { username, password });
}
