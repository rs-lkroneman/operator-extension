import React, { createContext } from "react";

import backgroundClient from "src/background/client";
import useCommandReducer from "src/store/useCommandReducer";

import { COMMANDS_UPDATE } from "src/constants";
import logger from "src/utils/logger";

const store = createContext({});
const { Provider } = store;

type StateProviderProps = {} & React.ComponentProps<"div">;

export const StateProvider = (props: StateProviderProps) => {
  const { children } = props;
  const [state, dispatch] = useCommandReducer();

  backgroundClient.addListener((payload) => {
    const backgroundPayload = {
      type: COMMANDS_UPDATE,
      payload,
    };

    logger.info("Received from background", payload);
    dispatch(backgroundPayload);
  });

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export default store;
