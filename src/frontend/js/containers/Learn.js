import reduxify from 'reduxify';
import * as actions from '../actions/index';
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import palette from '../constants/palette';
import Paper from 'material-ui/Paper';
import LearnPoint from './LearnPoint';
import LearnArticle from './LearnArticle';
import learnTexts from '../text/learnTexts';

const videoPoints = learnTexts.videoPoints;
const articles = learnTexts.articles;


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
  videoPaper: {
    margin: '2vh 2vw',
  }
});

class Learn extends Component {
  constructor(props){
    super(props);
  }

  render () {

    const header = (<div>
      {this.props.language === 'EN' ? <Paper className={css(styles.headerPaper)}>Reasons why the new Icelandic constitution must be enacted</Paper> : null}
      {/*Change this.  It still says "TEN" reasons in Icelandic. */}
      {this.props.language === 'IS' ? <Paper className={css(styles.headerPaper)}>Tíu ástæður fyrir því að nauðsynlegt er að nýja stjórnarskráin taki gildi</Paper> : null}
      </div>);

    const letters = (<div>{this.props.language === 'EN' ?
        <Paper className={css(styles.videoPaper)} zDepth={3}>

        </Paper>
      : null}</div>);

    return (<div>
      {header}
          {videoPoints.map((point, i) => (<LearnPoint pointNumber={10 - i}left={(i % 2 === 0)}key={"point-num-" + i} point={point}/>))}
          <div className={css(styles.headerPaper)}>Articles</div>
          {articles.map((arti, i) => <LearnArticle article={arti} key={"article" + i} />)}
    </div>
    );
  }
}

export default reduxify(actions, ['language'], Learn);
