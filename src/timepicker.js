import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TimePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    render() {
        return (
            <div>TimePicker</div>
        )
    }
}

TimePicker.PropTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func
}