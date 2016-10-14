import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';

export default class ProgressMeter extends Component {
  constructor(props) {
    super(props);
    this.style = StyleSheet.create({
      inner: {
        backgroundColor: props.color || '#0BD318',
        width: props.completed + '%',
        transition: "width 200ms",
        height: (props.height * (2 / 3) || 10) + "vh",
        position: 'absolute',
      },
      outer: {
        'backgroundColor': props.outerColor || 'rgb(255, 28, 143)',
        'height': (props.height || 15) + "vh",
        'borderRadius': '20px',
        'padding': '1vh 1vw',
        width: props.width + "vw",
        position:'relative',
      }
    });
  }

  render() {
    return (
      <div className={css(this.style.outer)}>
        <div className={css(this.style.inner)}>{this.props.children}</div>
      </div>
    );
  }
}
