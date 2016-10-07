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

const subheadline = {
  EN: 'In 2012, by a 2/3ds vote, the Icelandic people told its parliament to enact a constitution "based on" ' +
  'a constitution a citizen council had drafted. Four years later, they have done nothing. Help us show the politicians who they work for.',
  IS: 'Árið 2012, með 2 / 3DS atkvæði, íslenska þjóðin sagði þinginu til þess að enact stjórnarskrá "sem byggist á" stjórnarskrá borgari ráðið hafði samið. Fjórum árum síðar, hafa þeir ekki gert neitt. Hjálpið okkur að sýna stjórnmálamenn sem þeir vinna fyrir.'
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
    fontWeight: '900',
    fontSize: '10vw',
    margin: '2vh 4vw'
  },
  subheadline: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: '2vw',
    margin: '2vh 4vw',
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
  },
  videoContainer: {
    margin: '2vh, 2vw',
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
          </div>
          <div ref="rightContainer" className={css(Object.assign(styles.rightContainer))}>
            <Paper><iframe width="640" height="360" src="https://www.youtube.com/embed/mw2z9lV3W1g" frameborder="0" allowfullscreen></iframe></Paper>
          </div>
        </div>
        <div className={css(styles.subheadline)}>
          {subheadline[this.props.language]}
        </div>
      </Paper>
      </div>
    );
  }
}

export default reduxify(actions, ['language'], Hero);
