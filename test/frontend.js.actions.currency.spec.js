import chai from 'chai';
const expect = chai.expect;
import {
  SET_CURRENCY, CURRENCY_TYPES,
} from '../src/frontend/js/constants/index';
import {
  setCurrency
} from '../src/frontend/js/actions/currency';

describe('setCurrency()', () => {
  it('creates an action to set the currency', () => {
    expect(setCurrency("USD")).to.eql({
      type: SET_CURRENCY,
      currency: CURRENCY_TYPES.USD
    });
    expect(setCurrency("ISK")).to.eql({
      type: SET_CURRENCY,
      currency: CURRENCY_TYPES.ISK
    });
  });
});
