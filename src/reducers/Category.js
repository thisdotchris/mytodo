import * as actions from "./ActionTypes";
import { produce } from "immer";

export const initialState = {
  categories: [],
};

export function reducer(state, action) {
  switch (action.type) {
    case actions.SET_CATEGORY:
      return produce(state, (draftState) => {
        draftState.categories = action.payload.categories;
        return draftState;
      });
    case actions.ADD_CATEGORY:
      return produce(state, (draftState) => {
        draftState.categories.push(action.payload.category);
        return draftState;
      });
    case actions.UPDATE_CATEGORY:
      return produce(state, (draftState) => {
        draftState.categories = draftState.categories.map((cat) => {
          if (cat._id === action.payload.category._id) {
            cat = action.payload.category;
          }
          return cat;
        });
        return draftState;
      });
    case actions.REMOVE_CATEGORY:
      return produce(state, (draftState) => {
        draftState.categories = draftState.categories.filter(
          (cat) => cat._id !== action.payload._id
        );
        return draftState;
      });
    default:
      return state;
  }
}
