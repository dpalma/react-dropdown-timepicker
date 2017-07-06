import React, { Component } from 'react'

import TimePicker from '../src/timepicker'

import Example from './example'

export default class Content extends Component {
  render() {
    return(
      <div>
        <h1>Simple React Time Picker</h1>
        <section>
          <Example />
        </section>
      </div>
    )
  }
}
