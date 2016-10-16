import chai from 'chai';
const expect = chai.expect;
import {
  setLanguage
} from '../../../../src/frontend/js/actions/language';
import {
  language
} from '../../../../src/frontend/js/reducers/language';

describe('language()', () => {
  it('defaults to Icelandic', () => {
    expect(language(undefined, undefined)).to.equal("IS");
  });
  it('changes the language on demand', () => {
    expect(language(undefined, setLanguage("EN"))).to.equal("EN");
    expect(language("EN", setLanguage("IS"))).to.equal("IS");
  });
});
