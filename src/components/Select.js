const _isEqual = require('lodash/isEqual');
const keycode = require('keycode');
const PropTypes = require('prop-types');
// TODO_RADIUM_TO_GLAMOR - JSX refers to Listbox, which is a variable. So wanted behaviour unknown.
// TODO_RADIUM_TO_GLAMOR - JSX refers to Option, which is a variable. So wanted behaviour unknown.
// TODO_RADIUM_TO_GLAMOR - JSX refers to Icon, which is a variable. So wanted behaviour unknown.
// TODO_RADIUM_TO_GLAMOR - JSX refers to Icon, which is a variable. So wanted behaviour unknown.

import { css } from 'glamor';
const React = require('react');
const ReactDOM = require('react-dom');

const Icon = require('./Icon');
const { Listbox, Option } = require('./accessibility/Listbox');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');
const { deprecatePrimaryColor } = require('../utils/Deprecation');

// returns a function that takes a click event, stops it, then calls the callback
const haltEvent = callback => e => {
  e.preventDefault();
  e.stopPropagation();
  callback();
};

const optionShape = PropTypes.shape({
  displayValue: PropTypes.any.isRequired,
  icon: PropTypes.any,
  value: PropTypes.any.isRequired
});

class Select extends React.Component {
  static propTypes = {
    dropdownStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(optionShape),
    optionsStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    optionStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    optionTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    placeholderText: PropTypes.string,
    primaryColor: PropTypes.string,
    scrimStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    selected: optionShape,
    selectedStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    theme: themeShape,
    valid: PropTypes.bool
  };

  static defaultProps = {
    onChange () {},
    options: [],
    placeholderText: 'Select One',
    valid: true
  };

  constructor (props) {
    super(props);

    this.state = {
      isOpen: false,
      selected: props.selected
    };
  }

  componentDidMount () {
    deprecatePrimaryColor(this.props);
  }

  componentWillReceiveProps (newProps) {
    if (!_isEqual(newProps.selected, this.props.selected)) {
      this.setState({ selected: newProps.selected });
    }
  }

  _handleKeyDown = (e) => {
    switch (keycode(e)) {
      case 'esc':
        e.preventDefault();
        e.stopPropagation();
        this._close();
        break;
      case 'enter':
      case 'space':
        if (this.state.isOpen) return;
        e.preventDefault();
        e.stopPropagation();
        this._open();
        break;
    }
  };

  _close = () => {
    this.setState({ isOpen: false });
    this.component.focus();
  };

  _open = () => {
    this.setState({ isOpen: true });
  };

  _handleOptionClick = (option) => {
    this.setState({ selected: option }, () => {
      this._close();
      this.props.onChange(option);
    });
  };

  _scrollListDown = (nextIndex) => {
    const ul = ReactDOM.findDOMNode(this.optionList);
    const activeLi = ul.children[nextIndex];
    const heightFromTop = nextIndex * activeLi.clientHeight;

    if (heightFromTop > ul.clientHeight) {
      ul.scrollTop = activeLi.offsetTop - activeLi.clientHeight;
    }
  };

  _scrollListUp = (prevIndex) => {
    const ul = ReactDOM.findDOMNode(this.optionList);
    const activeLi = ul.children[prevIndex];
    const heightFromBottom = (this.props.options.length - prevIndex) * activeLi.clientHeight;

    if (heightFromBottom > ul.clientHeight) {
      ul.scrollTop = activeLi.offsetTop - activeLi.clientHeight;
    }
  };

  _renderScrim = (styles) => {
    if (this.state.isOpen) {
      return (
        <div
          className='mx-select-scrim'
          onClick={haltEvent(this._close)}
          {...css([styles.scrim, this.props.scrimStyle])}
        />
      );
    } else {
      return null;
    }
  };

  _renderOptions = (styles) => {
    if (this.state.isOpen) {
      if (this.props.children) {
        return (
          <div className='mx-select-options' {...css(styles.options)}>
            {this.props.children}
          </div>
        );
      } else {
        return (
          <Listbox
            aria-label={this.props.placeholderText}
            className='mx-select-options'
            ref={(ref) => this.optionList = ref}
            style={styles.options}
            useGlobalKeyHandler={true}
          >
            {this.props.options.map(option => {
              return (
                <Option
                  className='mx-select-option'
                  isSelected={_isEqual(option, this.state.selected)}
                  key={option.displayValue + option.value}
                  label={option.displayValue}
                  onClick={haltEvent(this._handleOptionClick.bind(null, option))}
                  style={Object.assign({},
                    styles.option,
                    this.props.optionStyle,
                    _isEqual(option, this.state.selected) ? styles.activeOption : null
                  )}
                >
                  {option.icon ? (
                    <Icon
                      size={20}
                      style={styles.optionIcon}
                      type={option.icon}
                    />
                  ) : null}
                  <div {...css(styles.optionText)}>{option.displayValue}</div>
                  {_isEqual(option, this.state.selected) ? <Icon size={20} type='check' /> : null }
                </Option>
              );
            })}
          </Listbox>
        );
      }
    } else {
      return null;
    }
  };

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme, this.props.primaryColor);
    const styles = this.styles(theme);
    const selected = this.state.selected || this.props.selected || { displayValue: this.props.placeholderText, value: '' };

    return (
      <div
        className='mx-select'
        {...css(Object.assign({}, this.props.style, { position: 'relative' }))}
      >
        <div
          className='mx-select-custom'
          onClick={haltEvent(this._open)}
          onKeyDown={this._handleKeyDown}
          ref={ref => this.component = ref}
          {...css(styles.component)}
          tabIndex='0'
        >
          {this._renderScrim(styles)}
          <div className='mx-select-selected' key='selected' {...css(styles.selected)}>
            {selected.icon ? (
              <Icon
                size={20}
                style={styles.optionIcon}
                type={selected.icon}
              />
            ) : null}
            <div {...css(styles.optionText)}>{selected.displayValue}</div>
            <Icon
              size={20}
              type={this.state.isOpen ? 'caret-up' : 'caret-down'}
            />
          </div>
          {this.props.options.length || this.props.children ? this._renderOptions(styles) : null}
        </div>
      </div>
    );
  }

  styles = (theme) => {
    const focusedOption = {
      backgroundColor: theme.Colors.PRIMARY,
      color: theme.Colors.WHITE,
      fill: theme.Colors.WHITE
    };

    return {
      component: Object.assign({},
        {
          backgroundColor: theme.Colors.WHITE,
          borderRadius: 3,
          border: '1px solid ' + theme.Colors.GRAY_300,
          cursor: 'pointer',
          fontFamily: theme.FontFamily,
          fontSize: theme.FontSizes.MEDIUM,
          padding: '8px 10px',
          position: 'relative',
          boxSizing: 'border-box'
        }, this.props.dropdownStyle),
      select: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '100%',
        opacity: 0
      },
      selected: Object.assign({},
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative'
        }, this.props.selectedStyle),
      invalid: {
        borderColor: theme.Colors.DANGER
      },
      options: Object.assign({},
        {
          backgroundColor: theme.Colors.WHITE,
          border: '1px solid ' + theme.Colors.GRAY_300,
          borderRadius: '0 0 3px 3px',
          left: -1,
          right: -1,
          margin: '8px 0 0 0',
          padding: 0,
          minWidth: '100%',
          position: 'absolute',
          zIndex: 10,
          fontSize: 12,
          boxShadow: theme.ShadowHigh,
          boxSizing: 'border-box',
          maxHeight: 260,
          overflow: 'auto'
        }, this.props.optionsStyle),
      activeOption: {
        fill: theme.Colors.PRIMARY,
        color: theme.Colors.PRIMARY
      },
      option: {
        display: 'flex',
        alignItems: 'center',
        color: theme.Colors.GRAY_700,
        cursor: 'pointer',
        backgroundColor: theme.Colors.WHITE,
        outline: 'none',
        padding: 10,
        whiteSpace: 'nowrap',

        ':focus': focusedOption,
        ':hover': focusedOption
      },
      optionIcon: {
        marginRight: 5
      },
      optionText: Object.assign({},
        {
          flex: '1 0 0%'
        }, this.props.optionTextStyle),
      scrim: {
        position: 'fixed',
        zIndex: 9,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    };
  };
}


module.exports = Select;
