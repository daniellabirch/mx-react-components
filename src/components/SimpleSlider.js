const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');

import { css } from 'glamor';
const _merge = require('lodash/merge');
const browser = require('bowser');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');
const { deprecatePrimaryColor } = require('../utils/Deprecation');

class SimpleSlider extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onPercentChange: PropTypes.func.isRequired,
    percent: PropTypes.number.isRequired,
    selectedColor: PropTypes.string,
    styles: PropTypes.object,
    theme: themeShape
  };

  static defaultProps = {
    disabled: false
  };

  state = {
    dragging: false,
    leftPixels: 0,
    width: 0
  };

  componentDidMount () {
    deprecatePrimaryColor(this.props, 'selectedColor');

    const component = ReactDOM.findDOMNode(this.rangeSelectorRef);
    const width = component.clientWidth;
    const leftPixels = this.props.percent * width;

    this.setState({ width, leftPixels });
  }

  componentWillReceiveProps (newProps) {
    if (this.props.percent !== newProps.percent) {
      const leftPixels = newProps.percent * this.state.width;

      this.setState({ leftPixels });
    }
  }

  _getCursorStyle = () => {
    if (this.props.disabled) {
      return 'not-allowed';
    } else if (browser.msie) {
      return 'pointer';
    } else {
      return this.state.dragging ? 'grabbing' : 'grab';
    }
  };

  _handleMouseEvents = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const leftSpace = ReactDOM.findDOMNode(this.rangeSelectorRef).getBoundingClientRect().left;
    let currentPercent = (clientX - leftSpace) / this.state.width;

    if (currentPercent < 0) {
      currentPercent = 0;
    } else if (currentPercent > 1) {
      currentPercent = 1;
    }

    this.props.onPercentChange(currentPercent);
  };

  _handleDragStart = () => {
    this.setState({
      dragging: true
    });
  };

  _handleDragging = (e) => {
    if (this.state.dragging) {
      this._handleMouseEvents(e);
    }
  };

  _handleDragEnd = () => {
    this.setState({
      dragging: false
    });
  };

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme, this.props.selectedColor);
    const styles = this.styles(theme);
    const { disabled } = this.props;

    return (
      <div {...css(styles.component)}>
        <div
          onMouseLeave={disabled ? null : this._handleDragEnd}
          onMouseMove={disabled ? null : this._handleDragging}
          onMouseUp={disabled ? null : this._handleDragEnd}
          onTouchEnd={disabled ? null : this._handleDragEnd}
          onTouchMove={disabled ? null : this._handleDragging}
          ref={(ref) => {
            this.rangeSelectorRef = ref;
          }}
          {...css(styles.range)}
        >
          <div
            onMouseDown={disabled ? null : this._handleMouseEvents}
            {...css(styles.trackHolder)}
          >
            <div {...css(styles.track)} />
            <div {...css(styles.selected)} />
          </div>
          <div
            onMouseDown={disabled ? null : this._handleDragStart}
            onTouchStart={disabled ? null : this._handleDragStart}
            {...css(styles.toggle)}
          />
        </div>
      </div>
    );
  }

  styles = (theme) => {
    const cursorStyle = this._getCursorStyle();

    return _merge({}, {
      component: {
        position: 'relative'
      },
      range: {
        padding: '25px 0',
        margin: `0 ${theme.Spacing.MEDIUM}px`
      },
      track: {
        height: 1,
        background: '#ccc'
      },
      trackHolder: {
        padding: `${theme.Spacing.MEDIUM}px 0`,
        cursor: this.props.disabled ? 'not-allowed' : 'pointer'
      },
      toggle: {
        width: theme.Spacing.LARGE,
        height: theme.Spacing.LARGE,
        borderRadius: '100%',
        background: theme.Colors.WHITE,
        boxShadow: theme.ShadowLow,
        position: 'absolute',
        top: '50%',
        left: this.state.leftPixels,
        transform: 'translate(20%, -50%)',
        WebkitTransform: 'translate(20%, -50%)',
        cursor: cursorStyle,
        zIndex: 2
      },
      selected: {
        position: 'absolute',
        left: theme.Spacing.SMALL,
        width: this.state.leftPixels,
        background: theme.Colors.PRIMARY,
        height: 3,
        top: '50%',
        transform: 'translateY(-50%)',
        WebkitTransform: 'translateY(-50%)',
        zIndex: 1
      }
    }, this.props.styles);
  };
}

module.exports = SimpleSlider;
