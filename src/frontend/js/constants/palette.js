import tinycolor from 'tinycolor2';

let palette = {
  white: '#FFFFFF',
  red: '#FF0000',
  iceFlagBlue: '#003897',
  blueHighlight: '#0C97E8',
  iceFlagRed: "#d72828",
  redHighlight: '#EE9B33',
};

palette.grey = tinycolor(palette.white).darken(50);

export default palette;
