import React, { Component } from 'react'
import PropTypes from 'prop-types'

import css from './timepicker.css'

export default class TimePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
        this.showDropdown = this.showDropdown.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    showDropdown() {
        this.setState({ isOpen: true });
        document.addEventListener("click", this.hideDropdown);
    }
        
    hideDropdown() {
        this.setState({ isOpen: false });
        document.removeEventListener("click", this.hideDropdown);
    }

    toggleDropdown() {
        if (this.state.isOpen) {
            this.hideDropdown();
        } else {
            this.showDropdown();
        }
    }

    render() {
        return (
            <div className={"timepicker__container" + (this.state.isOpen ? " timepicker__container__open" : " timepicker__container__closed")}>
                <div className="timepicker__display" onClick={this.toggleDropdown}>TimePicker</div>
                <div className="timepicker__droplist">
                    <ul>
                        <li>12:00</li>
                        <li>1:00</li>
                        <li>2:00</li>
                        <li>3:00</li>
                    </ul>
                </div>
            </div>
        )
    }
}

TimePicker.PropTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func
}
