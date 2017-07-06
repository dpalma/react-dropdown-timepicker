import React from 'react';
import { shallow } from 'enzyme';

import TimePicker from '../src/timepicker';

describe("TimePicker component", ()=>{
  test("default value is 12", () => {
    const tp = shallow(<TimePicker />);
    expect(tp.find(".timepicker__display").text()).toEqual("12:00");
  })

  test("can handle a Date object input", () => {
    const t = new Date(2000,1,1,3,32,0);
    const tp = shallow(<TimePicker time={t} />);
    expect(tp.find(".timepicker__display").text()).toEqual("3:32");
  })

  test("can handle a simple object input", () => {
    const t = {hour:4,minute:44};
    const tp = shallow(<TimePicker time={t} />);
    expect(tp.find(".timepicker__display").text()).toEqual("4:44");
  })

})
