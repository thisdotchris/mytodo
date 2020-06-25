import * as actions from "./ActionTypes";
import { produce } from "immer";

export const initialState = {
  categories: [
    { _id: 1, name: "category-1" },
    { _id: 2, name: "category-2" },
    { _id: 3, name: "category-3" },
    { _id: 4, name: "category-4" },
    { _id: 5, name: "category-5" },
  ],
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
