import React, { Component } from 'react'

import TimePicker from '../src/timepicker'

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: Date.now()
    }
  }

  handleTimeChange() {
    console.log(arguments);
  }

  render() {
    return(
      <div>
        <h1>Simple React Time Picker</h1>
        <section>
            <TimePicker onChange={this.handleTimeChange.bind(this)}/>
        </section>
      </div>
    )
  }
}
