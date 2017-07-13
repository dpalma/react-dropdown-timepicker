import React, { Component } from 'react'
import PropTypes from 'prop-types'

import css from './timepicker.css'

import padStart from 'lodash.padstart'

import 'font-awesome/scss/font-awesome.scss'

function TimeGridCell(props) {
  let minstr = padStart(props.minute.toString(), 2, "0");
  return (
    <div className={"timegrid__min timegrid__min"+minstr+(props.selected?" timegrid__min-selected":" timegrid__min-unselected")}
      onClick={props.onClick}>{":"+minstr}</div>
  )
}

class TimeGrid extends Component {
    render() {
      return(
        <div className="timegrid__container">
          {this.renderTimeGridColumn("am")}
          {this.renderTimeGridColumn("pm")}
        </div>
      )
    }

    // meridiem argument should be "am" or "pm"
    renderTimeGridColumn(meridiem) {
      return (
        <div className={"timegrid__"+meridiem+"col"}>
          <div className="timegrid__colheader">{meridiem.toUpperCase()}</div>
          {this.renderTimeGridHours(meridiem)}
        </div>
      )
    }

    handleClickTimeCell(t, src, event) {
      this.props.onChange(t);
    }

    renderTimeGridHours(meridiem) {
      const selHour = this.props.selectedTime.hour;
      const selMin = this.props.selectedTime.minute;
      let hours = [];
      const hourBase = meridiem === "pm" ? 12 : 0;
      for (let i = 0; i < 12; ++i) {
          let h = i || 12;
          let h24 = i + hourBase;
          let hstr = padStart(h24.toString(), 2, "0");
          hours.push(
            <div key={h} className={"timegrid__hour timegrid__hour"+hstr}>
              <div className={"timegrid__hourtext" + (selHour===h24?" timegrid__hourtext-selected":" timegrid__hourtext-unselected")}
                onClick={this.handleClickTimeCell.bind(this,{h24,m:0})}>{h}:00</div>
              <div className="timegrid__minutes">
                <TimeGridCell hour={h} minute={0} selected={selHour===h24&&selMin===0} onClick={this.handleClickTimeCell.bind(this,{h24,m:0})} />
                <TimeGridCell hour={h} minute={15} selected={selHour===h24&&selMin===15} onClick={this.handleClickTimeCell.bind(this,{h24,m:15})} />
                <TimeGridCell hour={h} minute={30} selected={selHour===h24&&selMin===30} onClick={this.handleClickTimeCell.bind(this,{h24,m:30})} />
                <TimeGridCell hour={h} minute={45} selected={selHour===h24&&selMin===45} onClick={this.handleClickTimeCell.bind(this,{h24,m:45})} />
              </div>
            </div>
          )
      }
      return hours;
    }
}

TimeGrid.PropTypes = {
    time: PropTypes.any,
    onChange: PropTypes.func
}

export default class TimePicker extends Component {
    constructor(props) {
        super(props)
        if (props.time instanceof Date) {
          var t = {
            hour: props.time.getHours(),
            minute: props.time.getMinutes()
          };
        } else if (props.time instanceof Object) {
          var t = props.time;
        } else {
          var t = {
            hour: 12,
            minute: 0
          }
        }
        this.state = {
          isOpen: false,
          time: t
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

    handleTimeChange(t) {
      this.setState({time:{hour:t.h24,minute:t.m}})
      if (this.props.onChange) {
          this.props.onChange({hour:t.h24,minute:t.m});
      }
    }

    render() {
        let timeStr = this.state.time.hour.toString() + ":" + padStart(this.state.time.minute.toString(), 2, "0");
        return (
            <div className={"timepicker__container" + (this.state.isOpen ? " timepicker__container__open" : " timepicker__container__closed")}>
                <div className="timepicker__display" onClick={this.toggleDropdown}>
                    {timeStr}
                    <i className="fa fa-clock-o"></i>
                </div>
                <div className="timepicker__droplist">
                  <TimeGrid selectedTime={this.state.time} onChange={this.handleTimeChange.bind(this)} />
                </div>
            </div>
        )
    }
}

TimePicker.PropTypes = {
    time: PropTypes.any,
    onChange: PropTypes.func
}
