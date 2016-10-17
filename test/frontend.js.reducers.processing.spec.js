import chai from 'chai';
const expect = chai.expect;
import {
  setProcessing
} from '../src/frontend/js/actions/processing';
import {
  processing
} from '../src/frontend/js/reducers/processing';

describe('processing()', () => {
  it('starts false', () => {
    expect(processing(undefined, undefined)).to.equal(false);
  });
  it('changes to true', () => {
    expect(processing(undefined, setProcessing(true))).to.equal(true);
    expect(processing(false, setProcessing(true))).to.equal(true);
  });
  it('goes back to false', () => {
    expect(processing(undefined, setProcessing(false))).to.equal(false);
    expect(processing(true, setProcessing(false))).to.equal(false);
  });
});
