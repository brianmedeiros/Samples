import React, { Component } from 'react';
import siteLogo from './logo.svg';
import './App.css';
import {ChocolateNav} from './components/ChocolateNav';
import {ChocolateBars} from './components/ChocolateBars';

const barSec = "";
class App extends Component {
    constructor(props){
        super(props);
        this.onBarSecChange = this.onBarSecChange.bind(this);
        this.state = {
            barSec: barSec
        }
    }

    onBarSecChange(sec){
        this.setState({barSec:sec});
    }
    render() {
        return (
            <div>
                <ChocolateNav barSec={this.state.barSec} onBarSecChange={this.onBarSecChange} />
                <ChocolateBars barSec={this.state.barSec} />
            </div>
        );
    }
}

export default App;
