import React, {
  Component
} from 'react';
import Donate from '../containers/Donate';
import Paper from 'material-ui/Paper';


const DirectDonate = () =>(<Paper zDepth={5} style={{backgroundColor: 'white', margin: '20px auto', width: '600px'}}>
    <Donate />
  </Paper>);

export default DirectDonate;
