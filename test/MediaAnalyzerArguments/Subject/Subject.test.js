import {expect} from 'chai';
import Subject from '../../../lib/MediaAnalyzerArguments/Subject/Subject';
import Gender from '../../../lib/MediaAnalyzerArguments/Subject/Gender';
import Company from '../../../lib/MediaAnalyzerArguments/Subject/Company';

describe('Test ApasiLocalQuestionnaire', () => {
  it('should be able to become an object', function () {
    const subject = new Subject(
      'subject_id',
      Gender.Female,
      '1.75',
      '70.1',
      new Date(),
      'practitioner_id',
      new Company('company_id', 'company_name')
    );

    const json = subject.asObject();

    expect(json.identifier).to.be.equals('subject_id');
    expect(json.gender).to.be.equals('female');
    expect(json.height).to.be.equals(1.75);
    expect(json.weight).to.be.equals(70.1);
    expect(json.generalPractitioner.identifier).to.be.equals('practitioner_id');
    expect(json.managingOrganization.identifier).to.be.equals('company_id');
    expect(json.managingOrganization.display).to.be.equals('company_name');
  });
});
