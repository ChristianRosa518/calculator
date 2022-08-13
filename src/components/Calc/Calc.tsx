import { format } from 'path';
import React, { useState } from 'react';
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

export const Calc: React.FC = () => {
  const [screen, setScreen] = useState<string>('');
  const [current, setCurrent] = useState<string>('0');
  const [values, setValues] = useState<(string | number)[]>([]);
  const [operator, setOperator] = useState<string>('none');
  const [reset, setReset] = useState<boolean>(false);

  function setOpe(val: string) {
    const lastItem: number = values.length - 1;
    if (values.length === 0 && current !== '0') {
      values.push(current, val);
      setCurrent('0');
      setScreen(formatScreen(values));
    } else if (
      current === '0' &&
      (values[lastItem] === '+' ||
        values[lastItem] === '-' ||
        values[lastItem] === 'x' ||
        values[lastItem] === '/')
    ) {
      values[lastItem] = val;
      setValues(values);
      setScreen(formatScreen(values));
    } else if (current !== '0') {
      values.push(current, val);
      setCurrent('0');
      setValues(values);
      setScreen(formatScreen(values));
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

  function clear() {
    setCurrent('0');
    setValues([]);
    setOperator('none');
    setScreen('');
  }
  function calcClear(value: number) {
    let result: string = value.toString();
    setCurrent(result);
    setValues([]);
    setOperator('none');
    setReset(true);
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

  function addValue(num: string) {
    if (current === '0' && num !== '.') {
      setCurrent(num);
      setScreen(formatScreen(values) + ' ' + num);
    } else if (current === '0' && num === '.') {
      setCurrent('0.');
      setScreen(formatScreen(values) + ' 0.');
    } else if (current !== '0') {
      if (current.includes('.') && num === '.') {
      } else {
        setCurrent(current + num);
        setScreen(formatScreen(values) + ' ' + (current + num));
      }
    }
  }

  return (
    <div className={styles.container}>
      {screen.length === 0 && <div className={styles.screen}>0</div>}
      {screen.length > 0 && <div className={styles.screen}>{screen}</div>}
      <div className={styles.buttonCon}>
        <div
          className={`${styles.numButton} ${grid.itemOne}`}
          onClick={() => addValue('1')}
        >
          1
        </div>
        <div
          className={`${styles.numButton} ${grid.itemTwo}`}
          onClick={() => addValue('2')}
        >
          2
        </div>
        <div
          className={`${styles.numButton} ${grid.itemThree}`}
          onClick={() => addValue('3')}
        >
          3
        </div>
        <div
          className={`${styles.numButton} ${grid.itemFour}`}
          onClick={() => addValue('4')}
        >
          4
        </div>
        <div
          className={`${styles.numButton} ${grid.itemFive}`}
          onClick={() => addValue('5')}
        >
          5
        </div>
        <div
          className={`${styles.numButton} ${grid.itemSix}`}
          onClick={() => addValue('6')}
        >
          6
        </div>
        <div
          className={`${styles.numButton} ${grid.itemSeven}`}
          onClick={() => addValue('7')}
        >
          7
        </div>
        <div
          className={`${styles.numButton} ${grid.itemEight}`}
          onClick={() => addValue('8')}
        >
          8
        </div>
        <div
          className={`${styles.numButton} ${grid.itemNine}`}
          onClick={() => addValue('9')}
        >
          9
        </div>
        <div
          className={`${styles.numButton} ${grid.itemTen}`}
          onClick={() => addValue('0')}
        >
          0
        </div>
        <div
          className={`${styles.numButton} ${grid.itemEleven}`}
          onClick={() => addValue('.')}
        >
          .
        </div>
        <div
          className={`${styles.numButton} ${grid.itemTwelve}`}
          onClick={clear}
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
