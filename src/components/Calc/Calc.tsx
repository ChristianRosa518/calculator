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
  const [screen, setScreen] = useState<string | number>('0');
  const [currentValue, setCurrentValue] = useState<string>('0');
  const [secondValue, setSecondValue] = useState<string>('0');
  const [operator, setOperator] = useState<string>('none');
  const [reset, setReset] = useState<boolean>(false);

  function setOpe(val: string) {
    setScreen(currentValue + ' ' + val + ' ');
    setOperator(val);
  }

  function clear() {
    setCurrentValue('0');
    setSecondValue('0');
    setOperator('none');
    setScreen('0');
  }
  function calcClear(value: number) {
    let result = value.toString();
    setCurrentValue(result);
    setSecondValue('0');
    setOperator('none');
    setReset(true);
  }

  function calculate() {
    let first: number = Number(currentValue);
    let second: number = Number(secondValue);
    switch (operator) {
      case '+':
        let result: number = first + second;
        setScreen(result);
        calcClear(result);
        break;
      case '-':
        let resultTwo: number = first - second;
        setScreen(resultTwo);
        calcClear(resultTwo);
        break;
      case 'x':
        let resultThree: number = first * second;
        setScreen(resultThree);
        calcClear(resultThree);
        break;
      case '/':
        let resultFour: number = first / second;
        setScreen(resultFour);
        calcClear(resultFour);
        break;
    }
  }

  function addValue(num: string) {
    if (reset === true && operator === 'none') {
      let current: string = '0';
      if (current === '0' && num !== '.') {
        setCurrentValue(num);
        setScreen(num);
        setReset(false);
      } else if (current === '0' && num === '.') {
        setCurrentValue('0.');
        setScreen('0.');
        setReset(false);
      } else if (current !== '0') {
        if (current.includes('.') && num === '.') {
        } else {
          setCurrentValue(currentValue + num);
          setScreen(currentValue + num);
          setReset(false);
        }
      }
    } else {
      if (operator === 'none') {
        if (currentValue === '0' && num !== '.') {
          setCurrentValue(num);
          setScreen(num);
        } else if (currentValue === '0' && num === '.') {
          setCurrentValue('0.');
          setScreen('0.');
        } else if (currentValue !== '0') {
          if (currentValue.includes('.') && num === '.') {
          } else {
            setCurrentValue(currentValue + num);
            setScreen(currentValue + num);
          }
        }
      } else if (operator !== 'none') {
        if (secondValue === '0' && num !== '.') {
          let newNum = num;
          setScreen(screen + newNum);
          setSecondValue(newNum);
        } else if (secondValue === '0' && num === '.') {
          let newNum = num;
          newNum = newNum + '.';
          setScreen(screen + newNum);
          setSecondValue(newNum);
        } else if (secondValue !== '0') {
          if (secondValue.includes('.') && num === '.') {
          } else {
            let newNum = num;
            setScreen(screen + newNum);
            setSecondValue(secondValue + newNum);
          }
        }
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.screen}>{screen}</div>
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
