import React from 'react';

export class ChocolateNav extends React.Component{
     constructor(props){
          super(props);
          //Nav controle
          this.state - {
              barSec: props.barSec
        };
          this.navClick = this.navClick.bind(this);
     }

     componentDidMount(){
     }
     componentWillUnmount(){
     }
     navClick(e){
          this.props.onBarSecChange(e.target.id);
          var navRow = document.getElementById('chocolateNavRow');
          var navs = navRow.getElementsByClassName('navOn');
          navs[0].classList.remove("navOn");
          e.target.classList.add('navOn');
     }

     render(){
          return(
            <div className='row' id='chocolateNavRow'>
              <div className="col-sm-3 col-xs-6 chocolateAppBtn navOn" id="bars1" onClick={this.navClick}>
                Fruity, Single Origin. <img src='./img/icons/icon-fruit.png' alt='' />
              </div>
              <div className="col-sm-3 col-xs-6 chocolateAppBtn" id="bars2" onClick={this.navClick}>
                Bold, Single Origin. <img src='./img/icons/icon-bold.png' alt='' />
              </div>
              <div className="col-sm-3 col-xs-6 chocolateAppBtn" id="bars3" onClick={this.navClick}>
                Inclusion Creations.
              </div>
              <div className="col-sm-3 col-xs-6 chocolateAppBtn" id="bars4" onClick={this.navClick}>
                Something Sweet.
              </div>
            </div>
          );
     }
}
