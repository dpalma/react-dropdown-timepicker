import React, { Component } from 'react'
import PropTypes from 'prop-types'

import css from './timepicker.css'

import 'font-awesome/scss/font-awesome.scss'

export default class TimePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            value: 12
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

    selectItem(value) {
        this.setState({value})
        if (this.props.onChange) {
            this.props.onChange();
        }
    }

    render() {
        return (
            <div className={"timepicker__container" + (this.state.isOpen ? " timepicker__container__open" : " timepicker__container__closed")}>
                <div className="timepicker__display" onClick={this.toggleDropdown}>
                    {this.state.value}
                    <i className="fa fa-angle-down"></i>
                </div>
                <div className="timepicker__droplist">
                    <div>
                        {this.renderChoices()}
                    </div>
                </div>
            </div>
        )
    }

    renderChoices() {
        let choices = [];
        for (let i = 0; i < 12; ++i) {
            let t = i || 12;
            choices.push(<div key={t} onClick={this.selectItem.bind(this, t)}>{t}</div>)
        }
        return choices;
    }
}

TimePicker.PropTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func
}
