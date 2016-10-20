import reduxify from 'reduxify';
import * as actions from '../actions/index';
import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import palette from '../constants/palette';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const languageExpand = {
  EN: {
    EN: "English",
    IS: "Ensk",
  },
  IS: {
    EN: "Icelandic",
    IS: "Íslensk",
  }
};

const styles = StyleSheet.create({
  outerBio: {
    maxWidth: '800px',
    margin:'10px auto 20px auto',
  },
  bioContainer: {
  },
  authorPic: {
    margin: '1vh 1vw',
    float: 'left',
  },
  bioText: {
    fontFamily: "Roboto Condensed",
  },
  mainText: {
    fontSize: '18px',
    maxWidth: '800px',
    margin:'auto',
    marginBottom: '24px',
  },
  translator:{
    fontStyle: "italic",
    fontSize: '15px',
  }
});

class LearnArticle extends Component {
  constructor(props){
    super(props);
    this.state = {
      expanded: false,
    };
    ["title", "languages", "author", "translator", "authorPics", "authorBios", "text"].forEach((dataKey) => {
      this[dataKey] = props.article[dataKey];
    });
    this.handleExpandToggle = this.handleExpandToggle.bind(this);
    this.parseLang = this.parseLang.bind(this);
  }

  handleExpandToggle () {
    this.setState({expanded: !this.state.expanded});
  }

  parseLang (l, i) {
    let str = languageExpand[l][this.props.language];
    if(i < this.languages.length - 1){
      str += " ";
    }
    return str;
  }

  render () {

    return (
      <Card>
        <CardHeader
          title={this.title[this.props.language]}
          subtitle={this.author}
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={{fontFamily: "Roboto Condensed", fontSize: '18px', fontWeight: '700'}}
        >
        </CardHeader>
        <CardText expandable={true}>
        <div className={css(styles.outerBio)}>
          {this.authorPics.map((pic, index) => <Card>
            <CardHeader
              subtitle={this.authorBios[this.props.language][index]}
              avatar={pic}
              />
            </Card>)}
          </div>
          {this.translator ? <div className={css(styles.mainText, styles.translator)}>{(this.translator + " þýddi")}</div> : null }
          {this.text[this.props.language].map((pgraph) => <div className={css(styles.mainText)}>{pgraph}</div>)}
        </CardText>
      </Card>
    );
  }
}

export default reduxify(actions, ['language'], LearnArticle);
