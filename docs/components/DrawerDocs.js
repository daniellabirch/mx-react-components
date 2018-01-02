// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const React = require('react');
const { Link } = require('react-router');

const { Button, Drawer, HeaderMenu } = require('mx-react-components');

const Markdown = require('components/Markdown');

class DrawerDocs extends React.Component {
  state = {
    demoDrawerOpen: false
  };

  _handleDemoButtonClick = () => {
    this.setState({
      demoDrawerOpen: true
    });
  };

  _handleDrawerClose = () => {
    this.setState({
      demoDrawerOpen: false
    });
  };

  _handleSimpleSelectClick = (event, item) => {
    this.setState({
      clickedMenu: item
    });
  };

  _renderDrawer = () => {
    const styles = this.styles();

    return (
      <Drawer
        breakPoints={{ large: 1200, medium: 1100 }}
        contentStyle={styles.content}
        headerMenu={(
          <HeaderMenu
            buttonIcon='gear'
            buttonText='Settings'
            items={[
              { icon: 'auto', onClick: this._handleSimpleSelectClick, text: 'Auto' },
              { icon: 'kids', onClick: this._handleSimpleSelectClick, text: 'Kids' },
              { icon: 'pets', onClick: this._handleSimpleSelectClick, text: 'Pets' }
            ]}
          />
        )}
        onClose={this._handleDrawerClose}
        title='Demo Drawer'
      >

        {this.state.clickedMenu && <code>You clicked: {this.state.clickedMenu.text}</code>}
        <p>
        Pellentesque finibus eros magna, ac feugiat mauris pretium posuere. Aliquam nec turpis bibendum, hendrerit eros et, interdum neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc pulvinar tempus sollicitudin. Mauris vel suscipit dolor. Vestibulum hendrerit malesuada ipsum. Mauris feugiat dui vel leo consequat tempor. Praesent aliquet posuere consequat. Nunc vel tellus eleifend leo finibus auctor.
        </p>
      </Drawer>
    );
  };

  render () {
    const styles = this.styles();

    return (
      <div>
        <h1>
          Drawer
          <label>A basic drawer component</label>
        </h1>

        <h3>Demo</h3>
        <Button onClick={this._handleDemoButtonClick}>
          Demo Drawer
        </Button>
        {this.state.demoDrawerOpen && this._renderDrawer()}

        <h3>Usage</h3>
        <h5>animateLeftDistance<label>Number</label></h5>
        <p>This number represents the percent of the screen visible between the left edge of the screen and the left edge of the drawer.</p>

        <h5>breakPoints<label>Object</label></h5>
        <p>This object takes 2 properties:</p>
        <ul style={styles.unorderdLists}>
          <li style={styles.listItem}><h5 style={styles.listItem}>large <label>Number</label></h5></li>
          <li style={styles.listItem}><h5 style={styles.listItem}>medium <label>Number</label></h5></li>
        </ul>
        <p>When the screen size is: <br />
          &#62;&#61; large: drawer width is maxWidth <br />
          &#60;	large and &#62; medium: drawer width is 20% from left side <br />
          &#60;&#61; medium: drawer width is 100%
        </p>

        <h5>closeOnScrimClick<label>Boolean</label></h5>
        <p>Default: true</p>
        <p>To prevent the drawer from closing if a user clicks on the screen outside of the drawer, set this to <em>false</em>.</p>

        <h5>contentStyle<label>Object or Array</label></h5>
        <p>Styles for the content inside the drawer.</p>

        <h5>duration<label>Number</label></h5>
        <p>Default: 500</p>
        <p>This number sets the duration of the drawer animation.</p>

        <h5>easing<label>Array</label></h5>
        <p>Default: [0.28, 0.14, 0.34, 1.04]</p>
        <p>Easing takes an array for how to step through the drawer animation.</p>

        <h5>focusOnLoad<label>Boolean</label></h5>
        <p>Default: true</p>
        <p>Determines if the Drawer component is focused on component mount</p>

        <h5>headerStyle<label>Object or Array</label></h5>
        <p>Styles for the header part of the drawer.</p>

        <h5>headerMenu<label>Function or Component</label></h5>
        <p>This is a function or component that you can pass into the header for a menu or addtional nav items.</p>
        <p>(See code in example for how to pass a component as a prop.)</p>

        <h5>maxWidth<label>Number</label></h5>
        <p>Default: 960</p>
        <p>This is the maximum width of the drawer component.</p>

        <h5>onClose<label>Function</label> Required</h5>
        <p>This function will be called when a user clicks the close drawer button.</p>

        <h5>showCloseButton<label>Boolean</label></h5>
        <p>Default: true</p>
        <p>To remove the close drawer button in the top left corner, set this to <em>false</em>.</p>

        <h5>showScrim<label>Boolean</label></h5>
        <p>Default: true</p>
        <p>If set to <em>true</em>, the part of the screen not covered by the drawer will be opaque. If set to <em>false</em>, the content will stay visible.</p>

        <h5>theme <label>Object</label></h5>
        <p>Customize the component&apos;s look. See <Link to='/components/theme'>Theme</Link> for more information.</p>

        <h5>title<label>String</label></h5>
        <p>Default: ''</p>
        <p>This will be displayed in the header of the drawer component.</p>

        <h5>DEPRECATED: navConfig <label>Object</label></h5>
        <p>This object requires 3 properties:</p>
        <ul style={styles.unorderdLists}>
          <li style={styles.listItem}><h5 style={styles.h5ListItem}>label <label>String</label></h5>This will be displayed between the two arrow buttons.</li>
          <li style={styles.listItem}><h5 style={styles.h5ListItem}>onPreviousClick <label>Function</label></h5> This function will be called when the left arrow is clicked.</li>
          <li style={styles.listItem}><h5 style={styles.h5ListItem}>onNextClick <label>Function</label></h5> this function will be called when the right arrow is clicked.</li>
        </ul>

        <h3>Example</h3>
        <Markdown>
  {`

    _handleDrawerClose () {
      this.setState({
        demoDrawerOpen: false
      });
    },

    <Drawer
      breakPoints={{ large: 1200, medium: 1100 }}
      contentStyle={styles.content}
      headerMenu={(
        <HeaderMenu
          handleButtonClick={this._handleSimpleSelectClick}
          handleScrimClick={this._handleSimpleSelectClick}
          showSimpleSelectMenu={this.state.showMenu}
        />
      )}
      onClose={this._handleDrawerClose}
      title='Demo Drawer'
    >
      // Content Here
    </Drawer>
  `}
        </Markdown>
      </div>
    );
  }

  styles = () => {
    return {
      content: {
        padding: 60,
        fontFamily: 'ProximaNovaRegular, Helvetica, Arial, sans-serif',
        color: '#2E323F'
      },
      unorderdLists: {
        marginTop: 0,
        marginBottom: 8
      },
      listItem: {
        marginTop: 0,
        marginBottom: 0
      },
      navLabel: {
        padding: '7px 14px',
        position: 'relative',
        bottom: 5,

        '@media (max-width: 750px)': {
          display: 'none',
          padding: 0
        }
      },
      h5ListItem: {
        marginTop: 0,
        marginBottom: 0
      }
    };
  };
}

module.exports = DrawerDocs;
