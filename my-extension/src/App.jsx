import React, {useEffect} from 'react';

// components
import SearchInput from "./components/SearchInput";

import './App.scss';

function App() {
  return (
    <div className="App">
      <SearchInput type="text" />
    </div>
  );
}

export default App;
