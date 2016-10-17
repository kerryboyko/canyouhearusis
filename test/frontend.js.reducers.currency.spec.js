import chai from 'chai';
const expect = chai.expect;
import {
  SET_CURRENCY, CURRENCY_TYPES,
} from '../src/frontend/js/constants/index';
import {
  setCurrency
} from '../src/frontend/js/actions/currency';
import {
  currency
} from '../src/frontend/js/reducers/currency';

describe('currency()', () => {
  it('switches the state based on the currency', () => {
    expect(currency(undefined, undefined)).to.eql(CURRENCY_TYPES["USD"]);
    expect(currency({foo: "bar"}, setCurrency("USD"))).to.eql(CURRENCY_TYPES.USD);
    expect(currency(CURRENCY_TYPES.USD, setCurrency("ISK"))).to.eql(CURRENCY_TYPES.ISK);
  });
});
