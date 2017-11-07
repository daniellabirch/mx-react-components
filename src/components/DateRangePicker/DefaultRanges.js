const PropTypes = require('prop-types');
// TODO_RADIUM_TO_GLAMOR - JSX refers to Icon, which is a variable. So wanted behaviour unknown.

import { css } from 'glamor';
const keycode = require('keycode');
const React = require('react');
const Icon = require('../Icon');

class DefaultRanges extends React.Component {
  state = {
    selectedOption: null
  };

  render () {
    const { defaultRanges, handleDefaultRangeSelection, primaryColor, selectedStartDate, selectedEndDate, styles } = this.props;

    return (
      <div {...css(styles.rangeOptions)}>

        {defaultRanges.map((range, index) => (
          <div
            key={range.displayValue + range.getStartDate()}
            onClick={() => {
              handleDefaultRangeSelection(range);
              this.setState({ selectedOption: index });
            }}
            onKeyUp={(e) => {
              if (keycode(e) === 'enter') {
                handleDefaultRangeSelection(range);
                this.setState({ selectedOption: index });
              }
            }}
            {...css(styles.rangeOption)}
            tabIndex={0}
          >
            <div>
              <Icon
                size={20}
                style={Object.assign({}, styles.rangeOptionIcon, {
                  fill:
                    this.state.selectedOption === index && range.getStartDate() === selectedStartDate && range.getEndDate() === selectedEndDate ? primaryColor : 'transparent'
                })}
                type='check-solid'
              />
            </div>
            <div>
              {range.displayValue}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

DefaultRanges.propTypes = {
  defaultRanges: PropTypes.array,
  handleDefaultRangeSelection: PropTypes.func,
  primaryColor: PropTypes.string,
  selectedEndDate: PropTypes.number,
  selectedStartDate: PropTypes.number,
  styles: PropTypes.shape({
    defaultRangesTitle: PropTypes.object,
    rangeOption: PropTypes.object,
    rangeOptions: PropTypes.object
  })
};

module.exports = DefaultRanges;
