import React from 'react';
import myBars1 from '../data/bars1.json';
import myBars2 from '../data/bars2.json';
import myBars3 from '../data/bars3.json';
import myBars4 from '../data/bars4.json';

export class ChocolateBars extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          barSec : props.barSec,
          bars1 : myBars1.bars,
          bars2 : myBars2.bars,
          bars3 : myBars3.bars,
          bars4 : myBars4.bars
      };
  }

  BarsDisplaySec(sec){
      switch(sec){
          case 'bars1':
          return this.state.bars1;
          case 'bars2' :
          return this.state.bars2;
          case 'bars3' :
          return this.state.bars3;
          case 'bars4' :
          return this.state.bars4;
          default :
          this.state.bars1;
      }
  }

  BarsDisplayHero(sec, opt){
      const optSec = opt === undefined ? 0 : opt ;
      return(
          sec[optSec]
      );
  }

  componentDidMount(){}
  componentWillUnmount(){}

    render(){
        const barList = this.props.barSec === "" ? this.state.bars1 : this.BarsDisplaySec(this.props.barSec);
        const hero = this.BarsDisplayHero(barList);
        return(
            <div>
              <h1>{hero.name}</h1>
              <h2>It is SPARTA Bar.</h2>
            </div>
        );
    }
}
