import reduxify from "../util/reduxify";
import * as actions from "../actions/index";
import React, { Component } from "react";
import IconButton from "material-ui/IconButton";
import Paper from "material-ui/Paper";

const facebookIconSVG = "../../img/facebookIcon.svg";
const twitterIconSVG = "../../img/twitterIcon.svg";

const TwitterIcon = props => <img {...props} src={twitterIconSVG} />;
const FacebookIcon = props => <img {...props} src={facebookIconSVG} />;

class Social extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const mainSocial = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <span style={{ marginLeft: "10px", marginRight: "10px" }}>
          <a
            href="https://twitter.com/share"
            className="twitter-share-button"
            data-text="Help us fight for #iceland and the #democratic #constitution approved by 2/3rds of voters but blocked by Parliament."
            data-url="http://canyouhearus.is"
            data-show-count="false"
          >
            Tweet
          </a>
        </span>
        <span style={{ marginLeft: "10px", marginRight: "10px" }}>
          <a
            href="https://twitter.com/CanYouHearUs_IS"
            className="twitter-follow-button"
            data-show-count="false"
          >
            Follow @CanYouHearUs_IS
          </a>
        </span>
        <span data-href="https://canyouhearus.is/" data-mobile-iframe="true">
          <a
            className="fb-xfbml-parse-ignore"
            target="_blank"
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcanyouhearus.is%2F"
          >
            <IconButton
              data-href="https://canyouhearus.is/"
              data-mobile-iframe="true"
            >
              <FacebookIcon width="24px" height="24px" />
            </IconButton>
          </a>
        </span>
        <div
          className="fb-follow"
          data-href="https://www.facebook.com/Stjornarskrarfelagid/"
          data-layout="button"
          data-size="small"
          data-show-faces="true"
        />
      </div>
    );

    return (
      <div>
        {this.props.transparent ? (
          mainSocial
        ) : (
          <Paper style={{ margin: "auto", maxWidth: "450px" }} zDepth={3}>
            {mainSocial}
          </Paper>
        )}
      </div>
    );
  }
}

export default reduxify(actions, ["language"], Social);
