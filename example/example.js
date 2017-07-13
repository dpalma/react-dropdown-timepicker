import React, { Component } from 'react'

import TimePicker from '../src/timepicker'

import padStart from 'lodash.padstart'

export default class Example extends Component {
  constructor(props) {
    super(props);
    let now = new Date();
    this.state = {
      hour: now.getHours(),
      minute: now.getMinutes()
    }
  }

  handleTimeChange(time) {
    this.setState(time);
  }

  render() {
    const { hour, minute } = this.state;
    return(
      <div>
        <div>
          {"Selected "+hour+":"+padStart(minute, 2, "0")}
        </div>
        <TimePicker time={this.state} onChange={this.handleTimeChange.bind(this)}/>
      </div>
    )
  }
}
