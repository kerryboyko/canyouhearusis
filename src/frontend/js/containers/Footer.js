import reduxify from 'reduxify';
import * as actions from '../actions/index';
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import palette from '../constants/palette';
import Paper from 'material-ui/Paper';

const styles = StyleSheet.create({
  aboutStyle: {
    backgroundColor: palette.heroBackground,
    width: '100%',
    padding: '3vw',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  textStyle: {
    fontFamily: "Roboto Condensed",
    color: palette.white,
    fontSize: "16px",
    lineHeight: "18px",
    marginBottom: "18px",
  },
  link: {
    color: palette.blueHighlight,
  }
});


const whoAreWe = {
  EN: {
    head: "This campaign is sponsored by the ",
    link: "Icelandic Constitution Society (Stjórnarskrárfélagið)",
    tail: ", a registered non-profit organisation in Iceland.",
  },
  IS: {
    head: "This campaign is sponsored by the ",
    link: "Icelandic Constitution Society (Stjórnarskrárfélagið)",
    tail: ", a registered non-profit organisation in Iceland.",
  },
};



class Footer extends Component {
  constructor(props){
    super(props);
    this.handleLinkToPrivacy = this.handleLinkToPrivacy.bind(this);
  }
  handleLinkToPrivacy () {
    this.props.actions.push('/privacy');
  }

  render () {
    return (<div>
      <Paper className={css(styles.aboutStyle)} zDepth={1} >
        <div className={css(styles.container, styles.textStyle)}>
          <div>
            {whoAreWe[this.props.language].head}
            <a className={css(styles.link)} href="http://stjornarskrarfelagid.is/">{whoAreWe[this.props.language].link}</a>
            {whoAreWe[this.props.language].tail}
            <br/>
            <br/>
            <a href="#" className={css(styles.link)} onClick={this.handleLinkToPrivacy}>Privacy Policy</a>
          </div>
        </div>
      </Paper>
    </div>
    );
  }
}

export default reduxify(actions, ['language'], Footer);
