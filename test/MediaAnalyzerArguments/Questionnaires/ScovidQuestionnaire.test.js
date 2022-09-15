import {expect} from 'chai';
import ScovidQuestionnaire from '../../../lib/MediaAnalyzerArguments/Questionnaires/ScovidQuestionnaire';

describe('Test ScovidQuestionnaire', () => {
  it('should validate', function () {
    let exceptionIsThrown = false;
    try {
      new ScovidQuestionnaire(1, 8, 0, 1, 2, 3, 0, 1, 2, 3);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new ScovidQuestionnaire(1, -1, 0, 1, 2, 4, 0, 1, 2, 3);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ScovidQuestionnaire(1, -1, 0, 1, 2, 3, 0, 1, 2, 3);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ScovidQuestionnaire(1, 11, 0, 1, 2, 3, 0, 1, 2, 3);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ScovidQuestionnaire(11, 10, 0, 1, 2, 3, 0, 1, 2, 3);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ScovidQuestionnaire(-1, 10, 0, 1, 2, 3, 0, 1, 2, 3);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;
  });

  it('should be able to become an object', function () {
    const questionnaire = new ScovidQuestionnaire(8, 10, 0, 1, 2, 3, 0, 1, 2, 3);
    const json = questionnaire.asObject();

    expect(Object.keys(json)).to.have.lengthOf(10);

    expect(json.pain).to.be.equals(8);
    expect(json.itchiness_scorad).to.be.equals(10);
    expect(json.fever).to.be.equals(0);
    expect(json.cough).to.be.equals(1);
    expect(json.cephalea).to.be.equals(2);
    expect(json.myalgiaorarthralgia).to.be.equals(3);
    expect(json.malaise).to.be.equals(0);
    expect(json.lossoftasteorolfactory).to.be.equals(1);
    expect(json.shortnessofbreath).to.be.equals(2);
    expect(json.otherskinproblems).to.be.equals(3);
  });

  it('should return the right name', function () {
    const scovidQuestionnaire = new ScovidQuestionnaire(8, 10, 0, 1, 2, 3, 0, 1, 2, 3);
    expect(scovidQuestionnaire.getName()).to.be.equals('SCOVID');
  });
});
