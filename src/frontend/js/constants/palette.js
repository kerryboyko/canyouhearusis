import tinycolor from 'tinycolor2';

let palette = {
  white: '#FFFFFF',
  red: '#FF0000',
  iceFlagBlue: '#003897',
  iceFlagRed: "#d72828",
};

palette.grey = tinycolor(palette.white).darken(50);


export default palette;
