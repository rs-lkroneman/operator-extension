import React, { createContext } from "react";
import backgroundClient from "../background/client";
import useCommandReducer from "./useCommandReducer";

import { COMMANDS_UPDATE } from "../constants";
import logger from "src/utils/logger";

const initialState = {
  searchTerm: "",
  selectedCommand: null,
  commands: [],
  filteredCommands: [],
};

const store = createContext(initialState);
const { Provider } = store;

type StateProviderProps = {} & React.ComponentProps<"div">;

export const StateProvider = (props: StateProviderProps) => {
  const { children } = props;
  const [state, dispatch] = useCommandReducer();

  backgroundClient.addListener((payload) => {
    const backendPayload = {
      type: COMMANDS_UPDATE,
      payload,
    };

    logger.info("Received from background", payload);
    dispatch(backendPayload);
  });

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export default store;
