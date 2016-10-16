import chai from 'chai';
const expect = chai.expect;
import {
  SET_PROCESSING
} from '../../../../src/frontend/js/constants/index';
import {
  setProcessing
} from '../../../../src/frontend/js/actions/processing';

describe('setProcessing()', () => {
  it('creates an action to set the payment processing status', () => {
    expect(setProcessing(true)).to.eql({
      type: SET_PROCESSING,
      status: true,
    });
    expect(setProcessing(false)).to.eql({
      type: SET_PROCESSING,
      status: false,
    });
  });
});
