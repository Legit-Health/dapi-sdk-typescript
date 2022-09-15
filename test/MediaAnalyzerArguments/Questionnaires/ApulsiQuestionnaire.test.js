import {expect} from 'chai';
import ApulsiQuestionnaire from '../../../lib/MediaAnalyzerArguments/Questionnaires/ApulsiQuestionnaire';

describe('Test ApulsiQuestionnaire', () => {
  it('should validate', function () {
    let exceptionIsThrown = false;
    try {
      new ApulsiQuestionnaire(0, 1, 1);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new ApulsiQuestionnaire(0, 0, 1);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new ApulsiQuestionnaire(0, 0, 0);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new ApulsiQuestionnaire(6, 0, 0);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new ApulsiQuestionnaire(7, 0, 0);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ApulsiQuestionnaire(-1, 0, 0);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ApulsiQuestionnaire(1, 2, 0);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ApulsiQuestionnaire(1, 1, 2);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;
  });

  it('should be able to become an object', function () {
    const apulsiQuestionnaire = new ApulsiQuestionnaire(2, 1, 0);
    const json = apulsiQuestionnaire.asObject();

    expect(Object.keys(json)).to.have.lengthOf(3);
    expect(json.erythema_surface).to.be.equals(2);
    expect(json.pain_apusa).to.be.equals(1);
    expect(json.odor_apusa).to.be.equals(0);
  });

  it('should return the right name', function () {
    const apulsiQuestionnaire = new ApulsiQuestionnaire(2, 1, 0);
    expect(apulsiQuestionnaire.getName()).to.be.equals('APULSI');
  });
});
