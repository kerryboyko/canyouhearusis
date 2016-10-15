import React, {Component} from 'react';
import reduxify from 'reduxify';
import * as actions from '../actions/index';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Donate from './Donate';
import DonateMobile from './DonateMobile';
import ReactGA from 'react-ga';
import { StyleSheet, css } from 'aphrodite';
import { isMobile } from '../util'

const thankYouShort = {
  EN: "Thank You!",
  IS: "Takk!"
};

const styles = StyleSheet.create({
  dialog: {
    width:'480px',
    left: 'calc(50% - 240px)',
    '@media (max-device-width: 800px)': {
      width: '96%',
      left: '2%',
    }
  }
});

class DonateDialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      zindex: -1000,
      mounted: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }

  componentDidMount(){
    this.setState({mounted: true});
  }
  componentWillUnmount(){
    this.setState({mounted: false});
  }
  handleOpen () {
    this.setState({open: true, zindex: 1500});
    ReactGA.event({
      category: 'Donate',
      action: 'Clicked A Donate Button',
    });
  }

  handleClose () {
    if(this.state.mounted){
      this.setState({open: false, zindex: -1000});
    }
  }

  render () {

    const actions = [
      <div>{this.props.processing ? null : <FlatButton
        label="Cancel"
        onTouchTap={this.handleClose}
        />}</div>,
    ];

    return (
      <span>
        <RaisedButton
          backgroundColor={this.props.backgroundColor}
          className={this.props.className}
          style={this.props.style}
          labelStyle={this.props.labelStyle}
          label={this.props.label}
          onTouchTap={this.handleOpen}
        />
        <Dialog
          title={thankYouShort[this.props.language]}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          className={css(styles.dialog)}
          style={{zIndex: this.state.zindex}}
        >
          {isMobile ? <DonateMobile closeCallback={this.handleClose}/> : <Donate closeCallback={this.handleClose}/>}
        </Dialog>
      </span>
    );
  }

}

export default reduxify(actions, ['language', 'processing'], DonateDialog);
