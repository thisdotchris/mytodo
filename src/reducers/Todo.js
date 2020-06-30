import * as actions from "./ActionTypes";
import { produce } from "immer";

export const initialState = {
  todos: [],
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
