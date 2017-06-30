import TimePicker from '../src/timepicker'

test("default value is 12", () => {
    let tp = new TimePicker();
    expect(tp.state.value).toBe(12);
})