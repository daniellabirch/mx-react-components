const React = require('react');

const { DatePicker } = require('mx-react-components');

const Markdown = require('components/Markdown');

const DatePickerDocs = React.createClass({
  render () {
    return (
      <div>
        <h1>
          DatePicker
          <label>Used to display and edit a start and end value with the option to define preset start/end values.</label>
        </h1>

        <h3>Demo</h3>
        <DatePicker
          closeOnDateSelect={true}
          title='Select A Date'
          useInputForSelectedDate={false}
        />

        <h3>Usage</h3>
        <h5>closeOnDateSelect <label>Boolean</label></h5>
        <p>Default: false</p>
        <p>If set to `true`, the calendar will be close after the user selects a data.</p>

        <h5>format <label>String</label></h5>
        <p>Default: 'YYYY-MM-DD'</p>
        <p>This is used to determine the format of the selected date. It should follow the Moment.js conventions outlined <a href='http://momentjs.com/docs/#/parsing/string-format/' target='_blank'>here</a>.</p>

        <h5>locale <label>String</label></h5>
        <p>Default: 'en'</p>
        <p>This is used to format the dates, day names, month names, etc based on the locale.</p>

        <h5>minimumDate <label>Number (unix timestamp)</label></h5>
        <p>If set, the user will not be able to select a date prior to this date.</p>

        <h5>onDateSelect <label>Function</label></h5>
        <p>A function to be called when the user has selected a date. The selected date timestamp will be passed to this function.</p>

        <h5>placeholderText <label>String</label></h5>
        <p>Default: Select A Date</p>
        <p>A string used as placeholder text for the selected date input when it is empty.</p>

        <h5>primaryColor <label>String</label></h5>
        <p>Default: PRIMARY</p>
        <p>The color used for input focus, selected date highlight, and hover border.</p>

        <h5>selectedDate <label>Number (unix timestamp)</label></h5>
        <p>This sets the selected date on the component. Can be used to set a default date.</p>

        <h3>Example</h3>
        <Markdown>
  {`
    _handleDateSelect (selectedDatePickerDate) {
      this.setState({
        selectedDatePickerDate
      });
    },

    <DatePicker
      closeOnDateSelect={true}
      onDateSelect={this._handleDateSelect}
      showDayBorders={false}
    />
  `}
        </Markdown>
      </div>
    );
  }
});

module.exports = DatePickerDocs;