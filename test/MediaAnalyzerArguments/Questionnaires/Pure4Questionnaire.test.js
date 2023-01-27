import {expect} from 'chai';
import Pure4Questionnaire from '../../../lib/MediaAnalyzerArguments/Questionnaires/Pure4Questionnaire';

describe('Test Pure4Questionnaire', () => {
  it('should validate', function () {
    let exceptionIsThrown = false;
    try {
      new Pure4Questionnaire(0, 0, 0, 0);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new Pure4Questionnaire(1, 1, 1, 1);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    for (let i = 0; i < 4; i++) {
      exceptionIsThrown = false;
      try {
        const arr = Array(4).fill(2);
        for (let j = 0; j < i; j++) {
          arr[j] = 0;
        }
        new Pure4Questionnaire(...arr);
      } catch (error) {
        exceptionIsThrown = true;
        expect(error.message).to.be.equals(`question${i + 1}Pure should be between 0 and 1`);
      }
      expect(exceptionIsThrown).to.be.true;
    }

    for (let i = 0; i < 4; i++) {
      exceptionIsThrown = false;
      try {
        const arr = Array(4).fill(-1);
        for (let j = 0; j < i; j++) {
          arr[j] = 1;
        }
        new Pure4Questionnaire(...arr);
      } catch (error) {
        exceptionIsThrown = true;
        expect(error.message).to.be.equals(`question${i + 1}Pure should be between 0 and 1`);
      }
      expect(exceptionIsThrown).to.be.true;
    }
  });

  it('should be able to become an object', function () {
    const pure4Questionnaire = new Pure4Questionnaire(0, 1, 0, 1);
    const json = pure4Questionnaire.asObject();

    expect(Object.keys(json)).to.have.lengthOf(4);
    expect(json.question1Pure).to.be.equals(0);
    expect(json.question2Pure).to.be.equals(1);
    expect(json.question3Pure).to.be.equals(0);
    expect(json.question4Pure).to.be.equals(1);
  });

  it('should return the right name', function () {
    const pure4Questionnaire = new Pure4Questionnaire(0, 1, 0, 0);
    expect(pure4Questionnaire.getName()).to.be.equals('PURE4');
  });
});
