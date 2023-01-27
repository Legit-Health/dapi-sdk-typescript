import {expect} from 'chai';
import UctQuestionnaire from '../../../lib/MediaAnalyzerArguments/Questionnaires/UctQuestionnaire';

describe('Test ScovidQuestionnaire', () => {
  it('should validate', function () {
    let exceptionIsThrown = false;
    try {
      new UctQuestionnaire(0, 0, 0, 0);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new UctQuestionnaire(4, 0, 0, 0);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new UctQuestionnaire(0, 4, 0, 0);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new UctQuestionnaire(0, 0, 4, 0);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new UctQuestionnaire(0, 0, 0, 4);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new UctQuestionnaire(-1, 0, 0, 0);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new UctQuestionnaire(5, 0, 0, 0);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new UctQuestionnaire(0, -1, 0, 0);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new UctQuestionnaire(0, 5, 0, 0);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new UctQuestionnaire(0, 0, -1, 0);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new UctQuestionnaire(0, 0, 5, 0);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new UctQuestionnaire(0, 0, 0, -1);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new UctQuestionnaire(0, 0, 0, 5);
    } catch (Throwable) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.true;
  });

  it('should be able to become an object', function () {
    const uctQuestionnaire = new UctQuestionnaire(1, 2, 0, 4);
    const json = uctQuestionnaire.asObject();

    expect(Object.keys(json)).to.have.lengthOf(4);

    expect(json.question1Uct).to.be.equals(1);
    expect(json.question2Uct).to.be.equals(2);
    expect(json.question3Uct).to.be.equals(0);
    expect(json.question4Uct).to.be.equals(4);
  });

  it('should return the right name', function () {
    const uctQuestionnaire = new UctQuestionnaire(1, 2, 0, 4);
    expect(uctQuestionnaire.getName()).to.be.equals('UCT');
  });
});
