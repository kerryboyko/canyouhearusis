import tinycolor from 'tinycolor2';

let palette = {
  white: '#FFFFFF',
  red: '#FF0000',
};
palette.grey = tinycolor(palette.white).darken(50); 


export default palette;
