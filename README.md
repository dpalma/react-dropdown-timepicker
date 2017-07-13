# React Simple Time Picker
Time picker for ReactJS based on the [Cozi Calendar](https://www.cozi.com/calendar) time picker. [See the demo](https://dpalma.github.io/react-simple-time-picker/).

## Installation

```shell
$ npm install --save react-simple-time-picker
```

## Usage

```javascript
import TimePicker from 'react-simple-time-picker';

render() {
	<TimePicker
      time={this.state.time}
      onChange={this.handleTimeChange.bind(this)} />
}
```
