import { useReducer } from "react";
import commandReducer, { initialState } from "src/store/commandReducer";

export default function useCommandReducer() {
  return useReducer(commandReducer, initialState);
}
