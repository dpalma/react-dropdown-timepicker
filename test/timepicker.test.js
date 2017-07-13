import React from 'react';
import { render, mount } from 'enzyme';

import padStart from 'lodash.padstart'

import TimePicker from '../src/timepicker';

describe("TimePicker component", ()=>{

  describe("initialization", ()=>{
    test("default value is 12", () => {
      const tp = render(<TimePicker />);
      expect(tp.find(".timepicker__display").text()).toEqual("12:00");
    })

    test("can handle a Date object input", () => {
      const t = new Date(2000,1,1,3,32,0);
      const tp = render(<TimePicker time={t} />);
      expect(tp.find(".timepicker__display").text()).toEqual("3:32");
    })

    test("can handle a simple object input", () => {
      const t = {hour:4,minute:44};
      const tp = render(<TimePicker time={t} />);
      expect(tp.find(".timepicker__display").text()).toEqual("4:44");
    })
  })

  describe("selection", ()=>{
    for (let h = 0; h < 24; ++h) {
      let hstr = padStart(h.toString(), 2, "0")
      let hselector = ".timegrid__hour"+hstr+" .timegrid__hourtext"

      test("clicking hour "+hstr+" displays "+hstr+":00", () => {
        const tp = mount(<TimePicker />);
        tp.find(hselector).simulate("click");
        expect(tp.find(".timepicker__display").text()).toEqual(h.toString()+":00");
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
          expect(tp.find(".timepicker__display").text()).toEqual(hmstr);
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

})
