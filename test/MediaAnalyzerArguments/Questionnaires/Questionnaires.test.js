import {expect} from 'chai';
import AuasLocalQuestionnaire from '../../../lib/MediaAnalyzerArguments/Questionnaires/AuasLocalQuestionnaire';
import ApasiLocalQuestionnaire from '../../../lib/MediaAnalyzerArguments/Questionnaires/ApasiLocalQuestionnaire';
import Questionnaires from '../../../lib/MediaAnalyzerArguments/Questionnaires/Questionnaires';

describe('Test Questionnaires', () => {
  it('should convert to a valid array', function () {
    const auasQuestionnaire = new AuasLocalQuestionnaire(3);
    const apasiQuestionnaire = new ApasiLocalQuestionnaire(4);
    const questionnaires = new Questionnaires([auasQuestionnaire, apasiQuestionnaire]);

    const obj = questionnaires.asObject();

    expect(Object.keys(obj)).to.have.lengthOf(2);

    expect(obj).to.have.property('AUAS_LOCAL');
    expect(obj['AUAS_LOCAL']).to.have.property('itchiness');
    expect(obj['AUAS_LOCAL']['itchiness']).equals(3);

    expect(obj).to.have.property('APASI_LOCAL');
    expect(obj['APASI_LOCAL']).to.have.property('surface');
    expect(obj['APASI_LOCAL']['surface']).equals(4);
  });
});
