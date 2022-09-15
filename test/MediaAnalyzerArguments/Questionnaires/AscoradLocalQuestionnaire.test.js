import {expect} from 'chai';
import AscoradLocalQuestionnaire from '../../../lib/MediaAnalyzerArguments/Questionnaires/AscoradLocalQuestionnaire';

describe('Test AscoradLocalQuestionnaire', () => {
  it('should validate', function () {
    let exceptionIsThrown = false;
    try {
      new AscoradLocalQuestionnaire(0, 0, 0);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new AscoradLocalQuestionnaire(100, 10, 10);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new AscoradLocalQuestionnaire(50, 6, 7);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new AscoradLocalQuestionnaire(101, 11, 11);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new AscoradLocalQuestionnaire(100, 11, 11);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new AscoradLocalQuestionnaire(100, 10, 11);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new AscoradLocalQuestionnaire(-1, -1, -1);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new AscoradLocalQuestionnaire(0, -1, -1);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new AscoradLocalQuestionnaire(0, 0, -1);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;
  });

  it('should be able to become an object', function () {
    const ascoradLocalQuestionnaire = new AscoradLocalQuestionnaire(27, 2, 1);
    const json = ascoradLocalQuestionnaire.asObject();

    expect(Object.keys(json)).to.have.lengthOf(3);
    expect(json.surface_value).to.be.equals(27);
    expect(json.itchiness_scorad).to.be.equals(2);
    expect(json.sleeplessness).to.be.equals(1);
  });

  it('should return the right name', function () {
    const ascoradLocalQuestionnaire = new AscoradLocalQuestionnaire(27, 2, 1);
    expect(ascoradLocalQuestionnaire.getName()).to.be.equals('ASCORAD_LOCAL');
  });
});
