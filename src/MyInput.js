import React, {Component} from 'react';

class MyInput extends Component{

  constructor(props) {
        super(props);
        this.state = {
          value: '',
        };

        // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return <input type="number" value={this.state.value} onChange={this.handleChange} />;
    }
}

export default MyInput;
