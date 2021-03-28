import React, { useContext, useEffect } from 'react';
import Store from '../store';

// constants
import {
  KEYCODE_KEYDOWN,
  KEYCODE_KEYUP,
  KEYCODE_ENTER
} from '../constants';

// components
import SearchInput from "../components/SearchInput";

import './App.scss';

function App() {
  const { state, dispatch } = useContext(Store);
  const { filteredCommands, selectedCommand } = state;
  const selectRef = React.createRef();

  const handleKeyPress = (e) => {
    if(e.keyCode === KEYCODE_ENTER) {
      e.preventDefault();
      console.log("KEYCODE_ENTER");
      dispatch({
        type: "COMMANDS_EXECUTE"
      });
      return;
    }

    if(e.keyCode === KEYCODE_KEYUP) {
      e.preventDefault();
      dispatch({
        type: "COMMANDS_SELECT_UP"
      });
      return;
    }

    if(e.keyCode === KEYCODE_KEYDOWN) {
      e.preventDefault();
      dispatch({
        type: "COMMANDS_SELECT_DOWN"
      });
      return;
    }

    const searchInput = e.currentTarget;
    const searchValue = searchInput.value;
    dispatch({ type: "COMMANDS_FILTER", payload: searchValue.trim() });
  };

  useEffect(() => {
    console.log('current select value')
    console.log(selectRef.current.value);
  }, [state.searchTerm, selectRef])

  const { name: selectedValue } = filteredCommands[selectedCommand] || {};
  return (
    <div className="App">
      <SearchInput type="text" onKeyDown={handleKeyPress} />
      <div className="App__SelectWrapper">
        <select className="App__Select" ref={selectRef} value={selectedValue}>
        {filteredCommands !== null && filteredCommands.map(
          command => <option value={command.name} key={command.name}>{command.name}</option>
        )}
        </select>
      </div>
    </div>
  );
}

export default App;
