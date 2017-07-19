import React from 'react';
import { render, mount } from 'enzyme';

import padStart from 'lodash.padstart'

import TimePicker from '../src/timepicker';

describe("TimePicker component", ()=>{

  describe("initialization", ()=>{
    test("default value is 12", () => {
      const tp = render(<TimePicker />);
      expect(tp.find(".timepicker__display input").prop("value")).toEqual("12:00");
    })

    test("can handle a Date object input", () => {
      const t = new Date(2000,1,1,3,32,0);
      const tp = render(<TimePicker time={t} />);
      expect(tp.find(".timepicker__display input").prop("value")).toEqual("3:32");
    })

    test("can handle a simple object input", () => {
      const t = {hour:4,minute:44};
      const tp = render(<TimePicker time={t} />);
      expect(tp.find(".timepicker__display input").prop("value")).toEqual("4:44");
    })
  })

  describe("selection", ()=>{
    for (let h = 0; h < 24; ++h) {
      let hstr = padStart(h.toString(), 2, "0")
      let hselector = ".timegrid__hour"+hstr+" .timegrid__hourtext"

      test("clicking hour "+hstr+" displays "+hstr+":00", () => {
        const tp = mount(<TimePicker />);
        tp.find(hselector).simulate("click");
        expect(tp.find(".timepicker__display input").prop("value")).toEqual(h.toString()+":00");
      })

      test("clicking hour "+hstr+" calls onChange", () => {
        let mockCallback = jest.fn();
        const tp = mount(<TimePicker onChange={mockCallback} />);
        tp.find(hselector).simulate("click");
        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.calls[0][0]).toEqual({
          hour: h,
          minute: 0
        });
      })

      for (let m of [0, 15, 30, 45]) {
        let mstr = padStart(m.toString(), 2, "0")
        let hmstr = h.toString()+":"+mstr;

        test("clicking "+hmstr+" displays that hour:minute", () => {
          const tp = mount(<TimePicker />);
          tp.find(".timegrid__hour"+hstr+" .timegrid__min"+mstr).simulate("click");
          expect(tp.find(".timepicker__display input").prop("value")).toEqual(hmstr);
        })

        test("clicking "+hmstr+" calls onChange", () => {
          let mockCallback = jest.fn();
          const tp = mount(<TimePicker onChange={mockCallback} />);
          tp.find(".timegrid__hour"+hstr+" .timegrid__min"+mstr).simulate("click");
          expect(mockCallback.mock.calls.length).toBe(1);
          expect(mockCallback.mock.calls[0][0]).toEqual({
            hour: h,
            minute: m
          });
        })
      }
    }

  })

  describe("parseTimeString function", () => {
    const testMinutes = [0, 15, 30, 45]
    for (let h = 0; h < 24; ++h) {
      let hstr = padStart(h.toString(), 2, "0")
      for (let m of testMinutes) {
        let mstr = padStart(m.toString(), 2, "0")

        let hmColonSep = hstr+":"+mstr;
        test("can parse "+hmColonSep, ()=>{
          let result = TimePicker.parseTimeString(hmColonSep);
          expect(result).toEqual({hour:h,minute:m});
        })
      }
    }

    for (let h = 0; h < 10; ++h) {
      test("parses single-digit "+h.toString()+" as "+h.toString()+":00", ()=> {
        let result = TimePicker.parseTimeString(h.toString());
        expect(result).toEqual({hour:h,minute:0});
      })

      test("parses partial "+h.toString()+": as "+h.toString()+":00", ()=> {
        let result = TimePicker.parseTimeString(h.toString()+":");
        expect(result).toEqual({hour:h,minute:0});
      })
    }

    for (let h = 0; h < 24; ++h) {
      let hstr = padStart(h.toString(), 2, "0")

      test("parses two-digit "+hstr+" as "+h.toString()+":00", ()=>{
        let result = TimePicker.parseTimeString(hstr);
        expect(result).toEqual({hour:h,minute:0});
      })

      test("parses partial "+hstr+": as "+h.toString()+":00", ()=>{
        let result = TimePicker.parseTimeString(hstr+":");
        expect(result).toEqual({hour:h,minute:0});
      })
    }

    //test("parses three-digit number to hour")
  })

  describe("text input", ()=>{

    test("typing a 24-hour time value initiates a change", () => {
      const tp = mount(<TimePicker />);
      tp.find('input').simulate('change', { target: { value: '14:34' } });
      expect(tp.state("time")).toEqual({
        hour: 14,
        minute: 34
      })
    })

    xtest("handles over-typing", ()=>{
      const tp = mount(<TimePicker />);
      tp.find('input').simulate('change', { target: { value: '1' } })
      expect(tp.state("time")).toEqual({ hour: 1, minute: 0 })
      tp.find('input').simulate('change', { target: { value: '14' } })
      expect(tp.state("time")).toEqual({ hour: 14, minute: 0 })
    })

  })

})
