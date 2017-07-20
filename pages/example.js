import React, { Component } from 'react'

import TimePicker from '../src/timepicker'

import padStart from 'lodash.padstart'

export default class Example extends Component {
  constructor(props) {
    super(props);
    let now = new Date();
    this.state = {
      time12hr: {
        hour: now.getHours(),
        minute: now.getMinutes()
      },
      time24hr: {
        hour: now.getHours(),
        minute: now.getMinutes()
      }
    }
  }

  handleTime24Change(time) {
    this.setState({time24hr:time});
  }

  handleTime12Change(time) {
    this.setState({time12hr:time});
  }

  render() {
    const { time12hr, time24hr } = this.state;
    return(
      <div>
        <div className="example__24hrcontainer">
          <span className="example__24hrtext">{"Selected "+time24hr.hour+":"+padStart(time24hr.minute, 2, "0")}</span>
          <TimePicker time={this.state.time24hr} onChange={this.handleTime24Change.bind(this)}/>
        </div>
        <div className="example__12hrcontainer">
          <span className="example__12hrtext">{"Selected "+time12hr.hour+":"+padStart(time12hr.minute, 2, "0")}</span>
          <TimePicker time={this.state.time12hr} onChange={this.handleTime12Change.bind(this)} displayFormat="12-hour" />
        </div>
      </div>
    )
  }
}
