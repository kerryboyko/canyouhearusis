import reduxify from '../utilities/reduxify';
import * as actions from '../actions/index';
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import palette from '../constants/palette';
import Paper from 'material-ui/Paper';
import LearnPoint from './LearnPoint';
import points from '../text/learnTexts';


const styles = StyleSheet.create({
  headerPaper: {
    backgroundColor: palette.iceFlagBlue,
    fontFamily: "Roboto Condensed",
    color: palette.white,
    textAlign: 'center',
    fontSize: '26px',
    margin: '2vh auto',
    padding: '1vh 2vw',
    width: '90vw',
  },
});

class Learn extends Component {
  constructor(props){
    super(props);
  }

  render () {

    const header = (<div>
      {this.props.language === 'EN' ? <Paper className={css(styles.headerPaper)}>Ten reasons why the new Icelandic constitution must be enacted</Paper> : null}
      {this.props.language === 'IS' ? <Paper className={css(styles.headerPaper)}>Tíu ástæður fyrir því að nauðsynlegt er að nýja stjórnarskráin taki gildi</Paper> : null}
      </div>);

    const footer = (<div>
      {this.props.language === 'EN' ? <Paper className={css(styles.headerPaper)}>More to come...</Paper> : null}
      {this.props.language === 'IS' ? <Paper className={css(styles.headerPaper)}>Meira væntalegt...</Paper> : null}
      </div>);

    return (<div>
      {header}
          {points.map((point, i) => (<LearnPoint pointNumber={10 - i}left={(i % 2 === 0)}key={"point-num-" + i} point={point}/>))}
      {footer}
    </div>
    );
  }
}

export default reduxify(actions, ['language'], Learn);
