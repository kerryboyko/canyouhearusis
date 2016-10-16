import chai from 'chai';
const expect = chai.expect;
import {
  SET_LANGUAGE
} from '../../../../src/frontend/js/constants/index';
import {
  setLanguage
} from '../../../../src/frontend/js/actions/language';

describe('setLanguage()', () => {
  it('creates an action to set the language', () => {
    expect(setLanguage("EN")).to.eql({
      type: SET_LANGUAGE,
      language: "EN"
    });
    expect(setLanguage("IS")).to.eql({
      type: SET_LANGUAGE,
      language: "IS"
    });
  });
});
