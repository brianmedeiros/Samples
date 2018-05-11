import React from 'react';

const subHeaders = [
    'Upgrade your chocolate.',
    'Craft Chocolate',
    'Not your Department Store Chocolate.',
    'Know your Chocolate.',
    'Bean to Bar.',
    'Taste Chocolate for the first time.',
    'You deserve this.',
    'So long, and thanks for all the fish.'
];

export class RandomLine extends React.Component{
  constructor(props){
    super(props);
    this.state = {line : this.pickOne(subHeaders)};
  }
  pickOne(array){
    this.rLine = array[Math.floor(Math.random()*array.length)];
    return(this.rLine);
  }
  render() {
    return (
      this.state.line
    );
  }
}
