import logo from './logo.svg';
import React, {useEffect} from 'react';
import './App.scss';

function App() {
  const ref = React.createRef();

  useEffect(() => {
    const { current } = ref;
    if(current) {
      current.focus();
    }
  })

  return (
    <div className="App">
      <input className="ChromeRunner__searchInput" type={'text'} ref={ref} />
    </div>
  );
}

export default App;
