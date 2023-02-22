import {expect} from 'chai';
import ApasiLocalQuestionnaire from '../../../lib/MediaAnalyzerArguments/Questionnaires/ApasiLocalQuestionnaire';

describe('Test ApasiLocalQuestionnaire', () => {
  it('should validate', function () {
    let exceptionIsThrown = false;
    try {
      new ApasiLocalQuestionnaire(5);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new ApasiLocalQuestionnaire(10);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ApasiLocalQuestionnaire(-1);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;
  });

  it('should be able to become an object', function () {
    const apasiLocalQuestionnaire = new ApasiLocalQuestionnaire(5);
    const json = apasiLocalQuestionnaire.asObject();

    expect(Object.keys(json)).to.have.lengthOf(1);
    expect(json.surface).to.be.equals(5);
  });

  it('should return the right name', function () {
    const apasiLocalQuestionnaire = new ApasiLocalQuestionnaire(5);
    expect(apasiLocalQuestionnaire.getName()).to.be.equals('APASI_LOCAL');
  });
});
