import {expect} from 'chai';
import ScoradLocalQuestionnaire from '../../../lib/MediaAnalyzerArguments/Questionnaires/ScoradLocalQuestionnaire';

describe('Test ScoradLocalQuestionnaire', () => {
  it('should validate', function () {
    let exceptionIsThrown = false;
    try {
      new ScoradLocalQuestionnaire(0, 0, 0, 0, 0, 0, 0, 0, 0);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new ScoradLocalQuestionnaire(100, 3, 3, 3, 3, 3, 3, 10, 10);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new ScoradLocalQuestionnaire(101, 3, 3, 3, 3, 3, 3, 10, 10);
    } catch (error) {
      exceptionIsThrown = true;
      expect((error as Error).message).to.be.equals('surfaceValue should be between 0 and 100');
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ScoradLocalQuestionnaire(-1, 3, 3, 3, 3, 3, 3, 10, 10);
    } catch (error) {
      exceptionIsThrown = true;
      expect((error as Error).message).to.be.equals('surfaceValue should be between 0 and 100');
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ScoradLocalQuestionnaire(50, 4, 3, 3, 3, 3, 3, 10, 10);
    } catch (error) {
      exceptionIsThrown = true;
      expect((error as Error).message).to.be.equals('erythema should be between 0 and 3');
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ScoradLocalQuestionnaire(50, -1, 3, 3, 3, 3, 3, 10, 10);
    } catch (error) {
      exceptionIsThrown = true;
      expect((error as Error).message).to.be.equals('erythema should be between 0 and 3');
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ScoradLocalQuestionnaire(50, 1, 4, 3, 3, 3, 3, 10, 10);
    } catch (error) {
      exceptionIsThrown = true;
      expect((error as Error).message).to.be.equals('swelling should be between 0 and 3');
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ScoradLocalQuestionnaire(50, 1, -1, 3, 3, 3, 3, 10, 10);
    } catch (error) {
      exceptionIsThrown = true;
      expect((error as Error).message).to.be.equals('swelling should be between 0 and 3');
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ScoradLocalQuestionnaire(50, 1, 1, 4, 3, 3, 3, 10, 10);
    } catch (error) {
      exceptionIsThrown = true;
      expect((error as Error).message).to.be.equals('crusting should be between 0 and 3');
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ScoradLocalQuestionnaire(50, 1, 1, -1, 3, 3, 3, 10, 10);
    } catch (error) {
      exceptionIsThrown = true;
      expect((error as Error).message).to.be.equals('crusting should be between 0 and 3');
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ScoradLocalQuestionnaire(50, 1, 1, 1, 4, 3, 3, 10, 10);
    } catch (error) {
      exceptionIsThrown = true;
      expect((error as Error).message).to.be.equals('excoriation should be between 0 and 3');
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ScoradLocalQuestionnaire(50, 1, 1, 1, -1, 3, 3, 10, 10);
    } catch (error) {
      exceptionIsThrown = true;
      expect((error as Error).message).to.be.equals('excoriation should be between 0 and 3');
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ScoradLocalQuestionnaire(50, 1, 1, 1, 1, 4, 3, 10, 10);
    } catch (error) {
      exceptionIsThrown = true;
      expect((error as Error).message).to.be.equals('lichenification should be between 0 and 3');
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ScoradLocalQuestionnaire(50, 1, 1, 1, 1, -1, 3, 10, 10);
    } catch (error) {
      exceptionIsThrown = true;
      expect((error as Error).message).to.be.equals('lichenification should be between 0 and 3');
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ScoradLocalQuestionnaire(50, 1, 1, 1, 1, 1, 4, 10, 10);
    } catch (error) {
      exceptionIsThrown = true;
      expect((error as Error).message).to.be.equals('dryness should be between 0 and 3');
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ScoradLocalQuestionnaire(50, 1, 1, 1, 1, 1, -1, 10, 10);
    } catch (error) {
      exceptionIsThrown = true;
      expect((error as Error).message).to.be.equals('dryness should be between 0 and 3');
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ScoradLocalQuestionnaire(50, 1, 1, 1, 1, 1, 1, 11, 10);
    } catch (error) {
      exceptionIsThrown = true;
      expect((error as Error).message).to.be.equals('itchinessScorad should be between 0 and 10');
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ScoradLocalQuestionnaire(50, 1, 1, 1, 1, 1, 1, -1, 10);
    } catch (error) {
      exceptionIsThrown = true;
      expect((error as Error).message).to.be.equals('itchinessScorad should be between 0 and 10');
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ScoradLocalQuestionnaire(50, 1, 1, 1, 1, 1, 1, 1, 11);
    } catch (error) {
      exceptionIsThrown = true;
      expect((error as Error).message).to.be.equals('sleeplessness should be between 0 and 10');
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new ScoradLocalQuestionnaire(50, 1, 1, 1, 1, 1, 1, 1, -1);
    } catch (error) {
      exceptionIsThrown = true;
      expect((error as Error).message).to.be.equals('sleeplessness should be between 0 and 10');
    }
    expect(exceptionIsThrown).to.be.true;
  });

  it('should be able to become an object', function () {
    const scoradLocalQuestionnaire = new ScoradLocalQuestionnaire(25, 0, 1, 2, 3, 0, 1, 5, 6);
    const json = scoradLocalQuestionnaire.asObject();

    expect(Object.keys(json)).to.have.lengthOf(9);
    expect(json.surfaceValue).to.be.equals(25);
    expect(json.lichenification).to.be.equals(0);
    expect(json.sleeplessness).to.be.equals(6);
    expect(json.erythema).to.be.equals(0);
    expect(json.swelling).to.be.equals(1);
    expect(json.crusting).to.be.equals(2);
    expect(json.excoriation).to.be.equals(3);
    expect(json.itchinessScorad).to.be.equals(5);
    expect(json.dryness).to.be.equals(1);
  });

  it('should return the right name', function () {
    const scoradLocalQuestionnaire = new ScoradLocalQuestionnaire(25, 3, 3, 3, 2, 1, 3, 5, 10);
    expect(scoradLocalQuestionnaire.getName()).to.be.equals('SCORAD_LOCAL');
  });
});
