import reduxify from '../utilities/reduxify';
import * as actions from '../actions/index';
import React, {Component} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import {StyleSheet, css} from 'aphrodite';
import _ from 'lodash';
import palette from '../constants/palette';
import Paper from 'material-ui/Paper';
// import popout from '../../img/popout.svg';

// import HeroPieChart from '../charts/HeroPieChart';


const headline = {
  EN: "CAN YOU HEAR US?",
  IS: "HEYRIRÐU Í OKKUR?"
};

const styles = StyleSheet.create({
  heroStyle : {
    // height: '100px'
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: '100%',
  },
  headlineStyle : {
    color: 'white',
    fontFamily: "Roboto Condensed",
    fontSize: '13vw',
    margin: '2vh 4vw'
  },
  flexContainer : {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
    marginBottom: '5vh',
    textAlign: 'center',
  },
  leftContainer : {
    width: '50vw',
    order: "1",
    color: "white",
    fontFamily: "Patua One",
    textAlign: 'left',
  },
  rightContainer : {
    width: '50vw',
    order: "2",
  },
  popoutStyle : {
    maxWidth: "100%",
    maxHeight: "90vh",
  },
  paragraph: {
    marginBottom: "1vh",
  },
  chart: {
    position: 'absolute',
    width: '50vw',
    height: '50vh',
    margin: '0px 30px 0px 30px',
  },
  chartContainer: {
    padding: '0px 30px 0px 30px',
  }
});

class Hero extends Component {
  constructor(props){
    super(props);
  }

  render () {
    return (<div>
      <Paper className={css(styles.heroStyle)} zDepth={1} >
        <div className={css(styles.flexContainer)}>
        <div ref="leftContainer" className={css(styles.leftContainer)}>
          <div className={css(styles.headlineStyle)}>
            {headline[this.props.language]}
          </div>
          <div className={css(styles.chartContainer)}>
          </div>
        </div>
        <div className={css(styles.rightContainer)}>
        </div>
        </div>
      </Paper>
      </div>
    );
  }
}

export default reduxify(actions, ['language'], Hero);
