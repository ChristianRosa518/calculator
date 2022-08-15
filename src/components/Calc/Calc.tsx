import { format } from 'path';
import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import styles from './Calc.module.css';
import grid from './Grid.module.css';

interface Props {
  currentValue: number;
  // Types
  // Optional value, so dont have to pass through, rest you do.
  bool?: boolean;
  // int : number
  // function gets values and their type, and then returns a value
  // can return void.
  // fn: (bob: string) => string
}

interface CalcState {
  count: string;
  screen: string[];
}

interface CalcAction {
  type: string;
  payload: string;
}

const initialState: CalcState = { count: '0', screen: ['0'] };

function reducer(state: CalcState, action: CalcAction) {
  let { payload } = action;
  let { count, screen } = state;

  switch (action.type) {
    case 'number':
      if (count === '0') {
        return { count: payload, screen: [payload] };
      } else
        return {
          count: count + payload,
          screen: [screen + payload],
        };
    case 'decimal':
      if (count.includes('.')) {
        return { ...state };
      } else
        return {
          ...state,
          count: count + payload,
          screen: [screen + payload],
        };
    case 'clear':
      return { count: '0', screen: ['0'] };
    default:
      return state;
  }
}

export const Calc = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const [current, setCurrent] = useState<string>('0');
  const [values, setValues] = useState<(string | number)[]>([]);

  function setOpe(val: string) {
    const lastItem: number = values.length - 1;
    if (values.length === 0 && current !== '0') {
      values.push(current, val);
      setCurrent('0');
    } else if (
      current === '0' &&
      (values[lastItem] === '+' ||
        values[lastItem] === '-' ||
        values[lastItem] === 'x' ||
        values[lastItem] === '/')
    ) {
      values[lastItem] = val;
      setValues(values);
    } else if (current !== '0') {
      values.push(current, val);
      setCurrent('0');
      setValues(values);
    }
  }

  function formatScreen(arr: (string | number)[]) {
    let format: string = '';
    for (let i = 0; i < arr.length; i++) {
      format = format + arr[i] + ' ';
      if (i === arr.length) {
      }
    }
    return format;
  }

  function calculate() {
    values.push(current);
    // do pemdas.
    if (values.length > 0) {
      if (values.includes('/')) {
        let divide: number = values.indexOf('/');
        console.log(divide);
        let prev: number = divide - 1;
        let next: number = divide + 1;

        let value: number = Number(values[prev]) / Number(values[next]);
        values[divide] = value;
        console.log(values);
        values.splice(next, 1);
        console.log(values);
        values.splice(prev, 1);
        console.log(values);
        setValues(values);
        console.log(values);
      }
    }
  }

  return (
    <div className={styles.container}>
      {state.screen.length === 0 && <div className={styles.screen}>0</div>}
      {state.screen.length > 0 && (
        <div className={styles.screen}>{state.screen}</div>
      )}
      <div className={styles.buttonCon}>
        <div
          className={`${styles.numButton} ${grid.itemOne}`}
          onClick={() => dispatch({ type: 'number', payload: '1' })}
        >
          1
        </div>
        <div
          className={`${styles.numButton} ${grid.itemTwo}`}
          onClick={() => dispatch({ type: 'number', payload: '2' })}
        >
          2
        </div>
        <div
          className={`${styles.numButton} ${grid.itemThree}`}
          onClick={() => dispatch({ type: 'number', payload: '3' })}
        >
          3
        </div>
        <div
          className={`${styles.numButton} ${grid.itemFour}`}
          onClick={() => dispatch({ type: 'number', payload: '4' })}
        >
          4
        </div>
        <div
          className={`${styles.numButton} ${grid.itemFive}`}
          onClick={() => dispatch({ type: 'number', payload: '5' })}
        >
          5
        </div>
        <div
          className={`${styles.numButton} ${grid.itemSix}`}
          onClick={() => dispatch({ type: 'number', payload: '6' })}
        >
          6
        </div>
        <div
          className={`${styles.numButton} ${grid.itemSeven}`}
          onClick={() => dispatch({ type: 'number', payload: '7' })}
        >
          7
        </div>
        <div
          className={`${styles.numButton} ${grid.itemEight}`}
          onClick={() => dispatch({ type: 'number', payload: '8' })}
        >
          8
        </div>
        <div
          className={`${styles.numButton} ${grid.itemNine}`}
          onClick={() => dispatch({ type: 'number', payload: '9' })}
        >
          9
        </div>
        <div
          className={`${styles.numButton} ${grid.itemTen}`}
          onClick={() => dispatch({ type: 'number', payload: '0' })}
        >
          0
        </div>
        <div
          className={`${styles.numButton} ${grid.itemEleven}`}
          onClick={() => dispatch({ type: 'decimal', payload: '.' })}
        >
          .
        </div>
        <div
          className={`${styles.numButton} ${grid.itemTwelve}`}
          onClick={() => dispatch({ type: 'clear', payload: '.' })}
        >
          A/C
        </div>
        <div
          className={`${styles.numButton} ${grid.itemThirteen}`}
          onClick={() => setOpe('+')}
        >
          +
        </div>
        <div
          className={`${styles.numButton} ${grid.itemFourteen}`}
          onClick={() => setOpe('-')}
        >
          -
        </div>
        <div
          className={`${styles.numButton} ${grid.itemFifteen}`}
          onClick={() => setOpe('x')}
        >
          x
        </div>
        <div
          className={`${styles.numButton} ${grid.itemSixteen}`}
          onClick={() => setOpe('/')}
        >
          /
        </div>
        <div
          className={`${styles.numButton} ${grid.itemSeventeen}`}
          onClick={calculate}
        >
          Enter
        </div>
      </div>
    </div>
  );
};

export default Calc;
