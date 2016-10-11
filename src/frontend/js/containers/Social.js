import reduxify from '../utilities/reduxify';
import * as actions from '../actions/index';
import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';


const facebookIconSVG = '../../img/facebookIcon.svg';
const twitterIconSVG = '../../img/twitterIcon.svg';

const TwitterIcon = (props) => (<img {...props} src={twitterIconSVG} />);
const FacebookIcon = (props) => (<img {...props} src={facebookIconSVG} />);

class Social extends Component {
  constructor(props){
    super(props);
  }

  render () {
    const mainSocial = (
      <div style={{ display:'flex', justifyContent: 'center', alignItems: 'center'}}>
          <span style={{marginLeft: '10px', marginRight: '10px'}}>{this.props.language === 'IS' ? "DEILA": "SHARE"}</span>
          <a href="https://twitter.com/share" className="twitter-share-button" data-text="Join the fight for democracy in Iceland, to fight for democracy in the entire world. " data-url="https://canyouhearus.is" data-hashtags="CanYouHearUs" data-show-count="false">
            <IconButton>
              <TwitterIcon width="24px" height="24px"/>
            </IconButton>
          </a>
          <span data-href="https://canyouhearus.is/" data-mobile-iframe="true">
            <a className="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcanyouhearus.is%2F">
              <IconButton data-href="https://canyouhearus.is/" data-mobile-iframe="true">
                <FacebookIcon width="24px" height="24px"/>
              </IconButton>
            </a>
          </span>
      </div>);
    return(
      <div>
        {this.props.transparent ? mainSocial : (<Paper style={{margin: 'auto', width: '200px'}} zDepth={3}>{mainSocial}</Paper>)}
      </div>
    );
  }
}

export default reduxify(actions, ['language'], Social);
