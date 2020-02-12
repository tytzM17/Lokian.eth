import React, {Component} from 'react';
import './StatBar.css';

class StatBar extends Component{

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="box">
        <div class="filler" style={{ width: `${this.props.percentage}%` }} />
      </div>
    );
  }
}

export default StatBar;
