import React, { useState, useRef } from 'react';
import Calc from './components/Calc/Calc';

function App() {
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  return (
    <div className="App">
      <Calc currentValue={2} />
    </div>
  );
}

export default App;
