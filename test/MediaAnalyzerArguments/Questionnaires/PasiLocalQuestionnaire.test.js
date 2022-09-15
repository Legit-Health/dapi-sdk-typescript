import {expect} from 'chai';
import PasiLocalQuestionnaire from '../../../lib/MediaAnalyzerArguments/Questionnaires/PasiLocalQuestionnaire';

describe('Test PasiLocalQuestionnaire', () => {
  it('should validate', function () {
    let exceptionIsThrown = false;
    try {
      new PasiLocalQuestionnaire(0, 0, 0, 0);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new PasiLocalQuestionnaire(6, 4, 4, 4);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new PasiLocalQuestionnaire(1, 2, 3, 4);
    } catch (error) {
      exceptionIsThrown = true;
    }
    expect(exceptionIsThrown).to.be.false;

    exceptionIsThrown = false;
    try {
      new PasiLocalQuestionnaire(7, 4, 4, 4);
    } catch (error) {
      exceptionIsThrown = true;
      expect(error.message).to.be.equals(`surface should be between 0 and 6`);
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new PasiLocalQuestionnaire(-1, 4, 4, 4);
    } catch (error) {
      exceptionIsThrown = true;
      expect(error.message).to.be.equals(`surface should be between 0 and 6`);
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new PasiLocalQuestionnaire(1, 5, 4, 4);
    } catch (error) {
      exceptionIsThrown = true;
      expect(error.message).to.be.equals(`erythema should be between 0 and 4`);
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new PasiLocalQuestionnaire(1, -5, 4, 4);
    } catch (error) {
      exceptionIsThrown = true;
      expect(error.message).to.be.equals(`erythema should be between 0 and 4`);
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new PasiLocalQuestionnaire(1, 4, 5, 4);
    } catch (error) {
      exceptionIsThrown = true;
      expect(error.message).to.be.equals(`induration should be between 0 and 4`);
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new PasiLocalQuestionnaire(1, 4, -1, 4);
    } catch (error) {
      exceptionIsThrown = true;
      expect(error.message).to.be.equals(`induration should be between 0 and 4`);
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new PasiLocalQuestionnaire(1, 4, 4, 5);
    } catch (error) {
      exceptionIsThrown = true;
      expect(error.message).to.be.equals(`desquamation should be between 0 and 4`);
    }
    expect(exceptionIsThrown).to.be.true;

    exceptionIsThrown = false;
    try {
      new PasiLocalQuestionnaire(1, 4, 4, -1);
    } catch (error) {
      exceptionIsThrown = true;
      expect(error.message).to.be.equals(`desquamation should be between 0 and 4`);
    }
    expect(exceptionIsThrown).to.be.true;
  });

  it('should be able to become an object', function () {
    const pasiLocalQuestionnaire = new PasiLocalQuestionnaire(5, 1, 2, 3);
    const json = pasiLocalQuestionnaire.asObject();

    expect(Object.keys(json)).to.have.lengthOf(4);
    expect(json.surface).to.be.equals(5);
    expect(json.erythema).to.be.equals(1);
    expect(json.induration).to.be.equals(2);
    expect(json.desquamation).to.be.equals(3);
  });

  it('should return the right name', function () {
    const pasiLocalQuestionnaire = new PasiLocalQuestionnaire(5, 1, 2, 3);
    expect(pasiLocalQuestionnaire.getName()).to.be.equals('PASI_LOCAL');
  });
});
