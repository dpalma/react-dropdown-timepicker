import React from 'react';
import { render, mount } from 'enzyme';

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
    test("clicking an AM-hour minute cell selects that hour:minute", () => {
      const tp = mount(<TimePicker />);
      tp.find(".timegrid__hour06 .timegrid__min30").simulate("click");
      expect(tp.find(".timepicker__display").text()).toEqual("6:30");
    })

    xtest("clicking a PM-hour minute cell selects that hour:minute", () => {
      const tp = mount(<TimePicker />);
      tp.find(".timegrid__hour23 .timegrid__min15").simulate("click");
      expect(tp.find(".timepicker__display").text()).toEqual("11:15");
    })

    test("clicking an hour cell selects that hour:00")
  })

})
