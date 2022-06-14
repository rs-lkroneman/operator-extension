import React, { useContext, useEffect } from "react";
import Store from "../store/store";

// constants
import { KEYCODE_KEYDOWN, KEYCODE_KEYUP, KEYCODE_ENTER } from "../constants";

// components
import SearchInput from "../components/SearchInput";
import SuggestionList from "../components/SuggestionList";
import logger from "src/utils/logger";
import backgroundClient from "src/background/client";
import { CommandSearchState } from "src/store/commandReducer";

function Popup() {
  const { state, dispatch } = useContext(Store);
  const { filteredCommands, selectedCommand } = state as CommandSearchState;
  const selectRef = React.createRef();

  const handleKeyPress = (e) => {
    if (e.keyCode === KEYCODE_ENTER) {
      e.preventDefault();
      logger.info("KEYCODE_ENTER");
      dispatch({
        type: "COMMANDS_EXECUTE",
      });
      return;
    }

    if (e.keyCode === KEYCODE_KEYUP) {
      e.preventDefault();
      dispatch({
        type: "COMMANDS_SELECT_UP",
      });
      return;
    }

    if (e.keyCode === KEYCODE_KEYDOWN) {
      e.preventDefault();
      dispatch({
        type: "COMMANDS_SELECT_DOWN",
      });
      return;
    }

    const searchInput = e.currentTarget;
    const searchValue = searchInput.value;
    dispatch({
      type: "COMMANDS_FILTER",
      payload: searchValue.trim(),
    });
  };

  const handleOptionClick = (option: string) => {
    dispatch({
      type: "COMMANDS_EXECUTE_OPTION",
      payload: option,
    });
  };

  useEffect(() => {
    backgroundClient.sendMessage("Wake Up");
  }, []);

  useEffect(() => {
    logger.info("current select value");
    logger.info(selectRef.current.value);
  }, [state.searchTerm, selectRef]);

  const selectedCommandOption =
    selectedCommand !== null ? filteredCommands[selectedCommand] : null;
  const selectedValue = selectedCommandOption?.id || "";
  // an onchange is necessary to keep the selet option from being set as read-only
  const onNativeOnChange = () => {};

  return (
    <div className="Popup">
      <SearchInput type="text" onKeyDown={handleKeyPress} />
      <SuggestionList
        selectedValue={selectedValue}
        options={filteredCommands}
        onOptionClick={handleOptionClick}
      />
      <div className="Popup__SelectWrapper">
        <select
          className="Popup__Select"
          ref={selectRef}
          value={selectedValue}
          onChange={onNativeOnChange}
        >
          {filteredCommands !== null &&
            filteredCommands.map((command, index) => (
              <option value={command.id} key={command.id}>
                {command.id}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}

export default Popup;
