const PropTypes = require('prop-types');
const React = require('react');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');

class PageIndicator extends React.Component {
  static propTypes = {
    activeIndex: PropTypes.number,
    count: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    theme: themeShape
  };

  _handleDotClick = (index = 0) => {
    if (this.props.onClick) {
      this.props.onClick(index);
    }
  };

  _renderDots = (styles) => {
    const dots = [];

    for (let i = 0; i < this.props.count; i++) {
      const dotStyles = this.props.activeIndex === i ? Object.assign({}, styles.dot, styles.dotActive) : styles.dot;

      dots.push(
        <span key={'dot' + i} onClick={this._handleDotClick.bind(null, i)} style={dotStyles} />
      );
    }

    return dots;
  };

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const styles = this.styles(theme);

    return (
      <div style={styles.component}>
        {this._renderDots(styles)}
      </div>
    );
  }

  styles = (theme) => {
    return {
      component: {
        textAlign: 'center',
        padding: '15px 0'
      },
      dot: {
        width: 6,
        height: 6,
        margin: 10,
        borderRadius: '100%',
        display: 'inline-block',
        verticalAlign: 'middle',
        backgroundColor: theme.Colors.GRAY_300,
        cursor: 'pointer'
      },
      dotActive: {
        backgroundColor: theme.Colors.GRAY_700
      }
    };
  };
}

module.exports = PageIndicator;
