import React, {Component} from 'react';
import './StatBar.css';

class StatBar extends Component{
  
  render() {
    return (
      <div className="box">
        <div className="filler" style={{ width: `${this.props.percentage}%` }} />
      </div>
    );
  }
}

export default StatBar;
