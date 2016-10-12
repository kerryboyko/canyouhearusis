import React, {Component} from 'react';
import reduxify from 'reduxify';
import * as actions from '../actions/index';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Donate from './Donate';

const pwdByStripe = '../../powered_by_stripe.svg';
const thankYouShort = {
  EN: "Thank You!",
  IS: "Takk!"
}

class DonateDialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      zindex: -1000,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen () {
    this.setState({open: true, zindex: 1500});
  }

  handleClose () {
    this.setState({open: false, zindex: -1000});
  }

  render () {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleClose}
        />,
      <img src={pwdByStripe} width={'80px'}/>
    ];

    return (
      <div>
        <RaisedButton
          backgroundColor={this.props.backgroundColor}
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
          style={{width:'480px', left: 'calc(50% - 240px)', zIndex: this.state.zindex}}
        >
          <Donate />
        </Dialog>
      </div>
    );
  }

}

export default reduxify(actions, ['language'], DonateDialog);
