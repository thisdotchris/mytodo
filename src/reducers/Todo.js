import * as actions from "./ActionTypes";
import { produce } from "immer";

export const initialState = {
  todos: [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ].map((i, idx) => {
    return {
      _id: idx,
      title: `todo #${idx}`,
      description: `todo #${idx} description asvduic liudbvldlvladfv iudguc digv c dfivubdigfuvciudgcvisdb cguibdiubiusdbivbdifvbiedcg iedbfvisdividbv asdcfversvgshvdrhvdbhvbvhbvbfvhfbvhb fvhtbvhvybjvtbvbv thvbvhtbhvtbgvhbvhbvh revhervhevshrsvhfcasfocnaceuipcgiupvcipgbipcg rgcnigcpiwjgbipjrcbgvcwntgi   ckgjnvshbdg`,
      category: 2,
      date: new Date(), //date created
      completed: false,
      deleted: false,
      pinToTop: false,
      checked: false,
    };
  }),
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
