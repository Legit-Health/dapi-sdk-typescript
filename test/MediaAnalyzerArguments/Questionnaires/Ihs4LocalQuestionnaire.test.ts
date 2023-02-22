import {expect} from 'chai';
import Ihs4LocalQuestionnaire from '../../../lib/MediaAnalyzerArguments/Questionnaires/Ihs4LocalQuestionnaire';

describe('Test Ihs4LocalQuestionnaire', () => {
  it('should be able to become an object', function () {
    const ihs4LocalQuestionnaire = new Ihs4LocalQuestionnaire(2, 1, 0);
    const json = ihs4LocalQuestionnaire.asObject();

    expect(Object.keys(json)).to.have.lengthOf(3);
    expect(json.noduleNumber).to.be.equals(2);
    expect(json.abscesseNumber).to.be.equals(1);
    expect(json.drainingTunnelNumber).to.be.equals(0);
  });

  it('should return the right name', function () {
    const ihs4LocalQuestionnaire = new Ihs4LocalQuestionnaire(5, 4, 2);
    expect(ihs4LocalQuestionnaire.getName()).to.be.equals('IHS4_LOCAL');
  });
});
