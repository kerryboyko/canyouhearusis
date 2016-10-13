import reduxify from 'reduxify';
import * as actions from '../actions/index';
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import palette from '../constants/palette';
import Paper from 'material-ui/Paper';
import partyText from '../text/partyText';
const statement = partyText.statement;
import Checkmark from 'material-ui/svg-icons/action/done';
import Cross from 'material-ui/svg-icons/content/clear';


const styles = StyleSheet.create({
  fCont: {
    display:'flex',
    flex: 'row',
    justifyContent: 'spaceBetween',
    alignItems: 'center',
    width: '740px',
    padding: '10px',
  },
  logo: {
    width: "125px",
    height: "125px",
  },
  logoBackbadge: {
    float: 'left',
    width: "145px",
    height: "145px",
    padding: '10px',
    borderRadius: '20px',
    backgroundColor: palette.white,
    margin: "10px"
  },
  goodBackbadge: {
    float: 'right',
    width: "145px",
    height: "145px",
    padding: '10px',
    borderRadius: '20px',
    backgroundColor: palette.goodGreen,
    margin: "10px"
  },
  badBackbadge: {
    float: 'right',
    width: "145px",
    height: "145px",
    padding: '10px',
    borderRadius: '20px',
    backgroundColor: palette.red,
    margin: "10px"
  },
  name: {
    fontFamily: "Roboto Condensed",
    overflow: 'hidden',
    width: '450px',
    fontSize: '1.25em',
    textAlign: 'center',
    color: palette.white,
  },
});

class Party extends Component {
  constructor(props){
    super(props);
    // props:
    // doesSupport, logo, partyName { EN, IS }
  }

  render () {
    const good = (<div className={css(styles.goodBackbadge)}><Checkmark className={css(styles.logo)} color={'white'} /></div>);
    const bad = (<div className={css(styles.badBackbadge)}><Cross className={css(styles.logo)} color={'white'} /></div>);

    return (
      <div className={css(styles.fCont)}>
        <div className={css(styles.logoBackbadge)}>
          <img src={this.props.data.logo} className={css(styles.logo)} />
        </div>
        <div className={css(styles.name)}>
          {this.props.language === 'EN' ? this.props.data.EN : null}
          {this.props.language === 'IS' ? this.props.data.IS : null}
        </div>
        {this.props.data.support ? good : bad}
      </div>
    );
  }
}

export default reduxify(actions, ['language'], Party);
