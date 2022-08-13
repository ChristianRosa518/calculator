import React from 'react';

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

export const Calc: React.FC<Props> = () => {
  return <div>Calc u lator</div>;
};

export default Calc;
