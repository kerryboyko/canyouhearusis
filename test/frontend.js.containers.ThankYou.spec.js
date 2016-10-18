import React from 'react';
import chai from 'chai';
const expect = chai.expect;
import {shallow, mount } from 'enzyme';


import ThankYou from '../src/frontend/js/containers/ThankYou';

describe('<ThankYou />', () => {
  it('is trying to get React testing to work', () => {
    const wrapper = shallow(<ThankYou />);
    expect(wrapper).to.eql({});
  });
});
