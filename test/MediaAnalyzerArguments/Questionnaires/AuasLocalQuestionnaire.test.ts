import {expect} from 'chai';
import AuasLocalQuestionnaire from '../../../lib/MediaAnalyzerArguments/Questionnaires/AuasLocalQuestionnaire';

describe('Test AuasLocalQuestionnaire', () => {
  it('should validate', function () {
    let exceptionIsThrown = false;
    try {
      new AuasLocalQuestionnaire(3);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new AuasLocalQuestionnaire(0);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new AuasLocalQuestionnaire(-1);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new AuasLocalQuestionnaire(10);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;
  });

  it('should be able to become an object', function () {
    const auasLocalQuestionnaire = new AuasLocalQuestionnaire(3);
    const json = auasLocalQuestionnaire.asObject();

    expect(Object.keys(json)).to.have.lengthOf(1);
    expect(json.itchiness).to.be.equals(3);
  });

  it('should return the right name', function () {
    const auasLocalQuestionnaire = new AuasLocalQuestionnaire(3);
    expect(auasLocalQuestionnaire.getName()).to.be.equals('AUAS_LOCAL');
  });
});
