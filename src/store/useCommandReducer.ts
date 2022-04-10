import { useReducer } from "react";
import commandReducer, { initialState } from "./commandReducer";

export default function useCommandReducer() {
  return useReducer(commandReducer, initialState);
}
