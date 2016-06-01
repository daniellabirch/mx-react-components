const React = require('react');
const ReactDOM = require('react-dom');
const { hashHistory, Route, IndexRoute, Router } = require('react-router');

const Button = require('components/ButtonDocs');
const ButtonGroup = require('components/ButtonGroupDocs');
const Changelog = require('components/Changelog');
const Components = require('components/Components');
const DatePicker = require('components/DatePickerDocs');
const DatePickerFullScreen = require('components/DatePickerFullScreenDocs');
const DisplayInput = require('components/DisplayInputDocs');
const DonutChart = require('components/DonutChartDocs');
const FileUpload = require('components/FileUploadDocs');
const Header = require('components/Header');
const Home = require('components/Home');
const Icon = require('components/IconDocs');
const Loader = require('components/LoaderDocs');
const Modal = require('components/ModalDocs');
const PageIndicator = require('components/PageIndicatorDocs');
const RadioButton = require('components/RadioButtonDocs');
const RangeSelector = require('components/RangeSelectorDocs');
const SearchInput = require('components/SearchInputDocs');
const Select = require('components/SelectDocs');
const SelectFullScreen = require('components/SelectFullScreenDocs');
const SimpleInput = require('components/SimpleInputDocs');
const Spin = require('components/SpinDocs');
const Styles = require('components/StylesDocs');
const TimeBasedLineChart = require('components/TimeBasedLineChartDocs');
const ToggleSwitch = require('components/ToggleSwitchDocs');
const TypeAhead = require('components/TypeAheadDocs');

const App = React.createClass({
  render () {
    const currentYear = new Date().getFullYear();

    return (
      <div>
        <Header />
        {this.props.children}
        <footer>
          <div className='container'>
            &copy; Copyright {currentYear} - MX
          </div>
        </footer>
      </div>
    );
  }
});

ReactDOM.render((
  <Router history={hashHistory}>
    <Route component={App} path='/'>
      <Route component={Components} path='components'>
        <IndexRoute component={Changelog} />
        <Route component={Button} path='button' />
        <Route component={ButtonGroup} path='button-group' />
        <Route component={DatePicker} path='date-picker' />
        <Route component={DatePickerFullScreen} path='date-picker-full-screen' />
        <Route component={DisplayInput} path='display-input' />
        <Route component={DonutChart} path='donut' />
        <Route component={FileUpload} path='file-upload' />
        <Route component={Icon} path='icon' />
        <Route component={Loader} path='loader' />
        <Route component={Modal} path='modal' />
        <Route component={PageIndicator} path='page-indicator' />
        <Route component={RadioButton} path='radio-button' />
        <Route component={RangeSelector} path='range-selector' />
        <Route component={SearchInput} path='search-input' />
        <Route component={Select} path='select' />
        <Route component={SelectFullScreen} path='select-full-screen' />
        <Route component={SimpleInput} path='simple-input' />
        <Route component={Spin} path='spin' />
        <Route component={Styles} path='styles' />
        <Route component={TimeBasedLineChart} path='time-based-line-chart' />
        <Route component={ToggleSwitch} path='toggle-switch' />
        <Route component={TypeAhead} path='type-ahead' />
      </Route>
      <IndexRoute component={Home} />
    </Route>
  </Router>
), document.getElementById('app'));
