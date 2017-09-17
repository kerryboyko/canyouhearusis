import reduxify from "../util/reduxify";
import * as actions from "../actions/index";
import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import palette from "../constants/palette";
import Paper from "material-ui/Paper";
import Party from "./Party";
import partyText from "../text/partyText";
const statement = partyText.statement;
const pData = partyText.data;
const partyOrder = partyText.order;

const styles = StyleSheet.create({
  main: {
    width: "800px",
    backgroundColor: palette.heroBackground,
    padding: "2vw",
    margin: "0 auto"
  },
  statementText: {
    fontFamily: "Roboto Condensed",
    fontSize: "1.25em",
    fontStyle: "italic",
    textAlign: "justify"
  },
  statementPaper: {
    backgroundColor: palette.white,
    padding: "20px",
    marginTop: "25px",
    marginBottom: "25px",
    width: "600px",
    textAlign: "center",
    margin: "auto"
  }
});

class Parties extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper className={css(styles.main)} zDepth={5}>
        <Paper className={css(styles.statementPaper)} zDepth={3}>
          <div className={css(styles.statementText)}>
            {statement[this.props.language]}
          </div>
        </Paper>
        {partyOrder.map((pRef, i) => (
          <Party key={"p" + i} data={pData[pRef]} />
        ))}
      </Paper>
    );
  }
}

export default reduxify(actions, ["language"], Parties);
