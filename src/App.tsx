import React, { useState, useRef } from 'react';
import Calc from './components/Calc/Calc';
import styles from './App.module.css';
import './All.css';

function App() {
  return (
    <div className={styles.home}>
      <Calc />
    </div>
  );
}

export default App;
