import React, { Component } from 'react'
import PropTypes from 'prop-types'

import css from './timepicker.css'

export default class TimePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    render() {
        return (
            <div className="timepicker">
                <div className="timepicker__input">TimePicker</div>
            </div>
        )
    }
}

TimePicker.PropTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func
}
