import { useReducer } from "react";
import commandReducer, { initialState } from "./commandReducer";

export default function useCommandReducer<T>() {
  return useReducer<T>(commandReducer, initialState);
}
