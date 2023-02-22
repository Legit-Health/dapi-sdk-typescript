import {expect} from 'chai';
import UasLocalQuestionnaire from '../../../lib/MediaAnalyzerArguments/Questionnaires/UasLocalQuestionnaire';

describe('Test ScovidQuestionnaire', () => {
  it('should validate', function () {
    let exceptionIsThrown = false;
    try {
      new UasLocalQuestionnaire(3, 15);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new UasLocalQuestionnaire(0, 15);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new UasLocalQuestionnaire(-1, 15);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new UasLocalQuestionnaire(10, 3);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;
  });

  it('should be able to become an object', function () {
    const questionnaire = new UasLocalQuestionnaire(3, 5);
    const json = questionnaire.asObject();

    expect(Object.keys(json)).to.have.lengthOf(2);

    expect(json.itchiness).to.be.equals(3);
    expect(json.hiveNumber).to.be.equals(5);
  });

  it('should return the right name', function () {
    const uasLocalQuestionnaire = new UasLocalQuestionnaire(3, 5);
    expect(uasLocalQuestionnaire.getName()).to.be.equals('UAS_LOCAL');
  });
});
