import * as actions from "./ActionTypes";
import { produce } from "immer";

export const initialState = {
  todos: [
    {
      _id: 1,
      title: "todo #1",
      description: "todo #1 description",
      category: 2,
      date: new Date(), //date created
      completed: false,
      deleted: false,
      pinToTop: false,
    },
    {
      _id: 2,
      title: "todo #2",
      description: "todo #2 description",
      category: 2,
      date: new Date(), //date created
      completed: false,
      deleted: false,
      pinToTop: false,
    },
    {
      _id: 3,
      title: "todo #3",
      description: "todo #3 description",
      category: 1,
      date: new Date(), //date created
      completed: false,
      deleted: false,
      pinToTop: false,
    },
  ],
};

export function reducer(state, action) {
  switch (action.type) {
    case actions.SET_TODO:
      return produce(state, (draft) => {
        draft.todos = action.payload.todos;
        return draft;
      });
    case actions.ADD_TODO:
      return produce(state, (draft) => {
        draft.todos.push(action.payload.todo);
        return draft;
      });
    case actions.UPDATE_TODO:
      return produce(state, (draft) => {
        draft.todos = draft.todos.map((todo) => {
          if (todo._id === action.payload.todo._id) {
            todo = action.payload.todo;
          }
          return todo;
        });
        return draft;
      });
    case actions.REMOVE_TODO:
      return produce(state, (draft) => {
        draft.todos = draft.todos.filter(
          (todo) => todo._id !== action.payload._id
        );
        return draft;
      });
    default:
      return state;
  }
}
