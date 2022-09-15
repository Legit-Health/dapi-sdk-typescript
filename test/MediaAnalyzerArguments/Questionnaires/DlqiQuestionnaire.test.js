import {expect} from 'chai';
import DlqiQuestionnaire from '../../../lib/MediaAnalyzerArguments/Questionnaires/DlqiQuestionnaire';

describe('Test AuasLocalQuestionnaire', () => {
  it('should validate', function () {
    let exceptionIsThrown = false;
    try {
      new DlqiQuestionnaire(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new DlqiQuestionnaire(3, 3, 3, 3, 3, 3, 3, 3, 3, 3);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new DlqiQuestionnaire(1, 2, 3, 1, 2, 3, 1, 2, 3, 1);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    for (let i = 0; i < 10; i++) {
      exceptionIsThrown = false;
      try {
        const arr = Array(10).fill(4);
        for (let j = 0; j < i; j++) {
          arr[j] = 3;
        }
        new DlqiQuestionnaire(...arr);
      } catch (error) {
        exceptionIsThrown = true;
        expect(error.message).to.be.equals(`question${i + 1} should be between 0 and 3`);
      }
      expect(exceptionIsThrown).to.be.true;
    }

    for (let i = 0; i < 10; i++) {
      exceptionIsThrown = false;
      try {
        const arr = Array(10).fill(-1);
        for (let j = 0; j < i; j++) {
          arr[j] = 3;
        }
        new DlqiQuestionnaire(...arr);
      } catch (error) {
        exceptionIsThrown = true;
        expect(error.message).to.be.equals(`question${i + 1} should be between 0 and 3`);
      }
      expect(exceptionIsThrown).to.be.true;
    }
  });

  it('should be able to become an object', function () {
    const dlqiQuestionnaire = new DlqiQuestionnaire(1, 2, 3, 1, 2, 3, 1, 2, 3, 1);
    const json = dlqiQuestionnaire.asObject();

    expect(Object.keys(json)).to.have.lengthOf(10);
    expect(json.question1).to.be.equals(1);
    expect(json.question2).to.be.equals(2);
    expect(json.question3).to.be.equals(3);
    expect(json.question4).to.be.equals(1);
    expect(json.question5).to.be.equals(2);
    expect(json.question6).to.be.equals(3);
    expect(json.question7).to.be.equals(1);
    expect(json.question8).to.be.equals(2);
    expect(json.question9).to.be.equals(3);
    expect(json.question10).to.be.equals(1);
  });

  it('should return the right name', function () {
    const dlqiQuestionnaire = new DlqiQuestionnaire(1, 2, 3, 1, 2, 3, 1, 2, 3, 3);
    expect(dlqiQuestionnaire.getName()).to.be.equals('DLQI');
  });
});
