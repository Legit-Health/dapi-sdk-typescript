import path from 'path';
import {expect} from 'chai';
import {readFileSync} from 'fs';
import dotenv from 'dotenv';
import {subMonths} from 'date-fns';
import generateRandomString from './generateRandomString';
import {
  AscoradLocalQuestionnaire,
  ApasiLocalQuestionnaire,
  PasiLocalQuestionnaire,
  AuasLocalQuestionnaire,
  UasLocalQuestionnaire,
  Ihs4LocalQuestionnaire,
  Pure4Questionnaire,
  DlqiQuestionnaire,
  Questionnaires,
  BodySiteCode,
  Operator,
  Subject,
  Gender,
  Company,
  FollowUpArguments,
  PreviousMedia,
  MediaAnalyzer
} from '../index';

const env = dotenv.config({path: '.env.local'});

describe('Test followup requests', () => {
  it('should work with psoriasis followup', async function () {
    const mediaAnalyzer = new MediaAnalyzer(env.parsed.API_URL, env.parsed.API_KEY);

    const imagePath = path.resolve('./test/resources/psoriasis_02.png');
    const image = readFileSync(imagePath, {encoding: 'base64'});

    const previousImagePath = path.resolve('./test/resources/psoriasis_01.png');
    const previousImage = readFileSync(previousImagePath, {encoding: 'base64'});
    const previousImageDate = subMonths(new Date(), 1);

    const apasiLocal = new ApasiLocalQuestionnaire(3);
    const pasiLocal = new PasiLocalQuestionnaire(3, 2, 1, 1);
    const pure4 = new Pure4Questionnaire(0, 0, 0, 1);
    const dlqi = new DlqiQuestionnaire(1, 1, 2, 0, 0, 0, 1, 2, 2, 0);
    const questionnaires = new Questionnaires([apasiLocal, pasiLocal, pure4, dlqi]);

    const followUpArguments = new FollowUpArguments(
      generateRandomString(15),
      image,
      'Psoriasis',
      BodySiteCode.ArmLeft,
      [new PreviousMedia(previousImage, previousImageDate)],
      Operator.Patient,
      new Subject(
        generateRandomString(15),
        Gender.Male,
        '1.75',
        '69.00',
        new Date(),
        generateRandomString(15),
        new Company(generateRandomString(), 'Company Name')
      ),
      questionnaires.questionnaires.map((questionnaire) => questionnaire.getName()),
      questionnaires
    );
    const response = await mediaAnalyzer.followUp(followUpArguments);

    expect(response.preliminaryFindings.hasConditionSuspicion).greaterThanOrEqual(0);
    expect(response.preliminaryFindings.isPreMalignantSuspicion).greaterThanOrEqual(0);
    expect(response.preliminaryFindings.needsBiopsySuspicion).greaterThanOrEqual(0);
    expect(response.preliminaryFindings.needsSpecialistsAttention).greaterThanOrEqual(0);

    expect(response.modality).to.not.be.null;

    const mediaValidity = response.mediaValidity;
    expect(mediaValidity.isValid).to.be.true;
    expect(mediaValidity.diqaScore).greaterThan(0);
    mediaValidity.validityMetrics.forEach(function (validityMetric) {
      expect(validityMetric.pass).to.be.true;
      expect(validityMetric.name).to.be.not.empty;
    });

    const metrics = response.metricsValue;
    expect(metrics.sensitivity).greaterThan(0);
    expect(metrics.specificity).greaterThan(0);

    expect(response.explainabilityMedia).to.not.be.null;

    expect(response.iaSeconds).greaterThan(0);

    expect(response.scoringSystemsValues).to.have.lengthOf(4);

    // APASI
    const apasiLocalScoringSystemValue = response.getScoringSystemValues('APASI_LOCAL');
    expect(apasiLocalScoringSystemValue.getScore().calculatedScore).greaterThanOrEqual(0);
    expect(apasiLocalScoringSystemValue.getScore().category).to.not.be.null;

    expect(apasiLocalScoringSystemValue.getFacetCalculatedValue('desquamation').intensity).to.not.be
      .null;
    expect(
      apasiLocalScoringSystemValue.getFacetCalculatedValue('desquamation').intensity
    ).to.be.within(0, 100);
    expect(apasiLocalScoringSystemValue.getFacetCalculatedValue('desquamation').value).to.be.within(
      0,
      4
    );

    expect(apasiLocalScoringSystemValue.getFacetCalculatedValue('erythema').intensity).to.not.be
      .null;
    expect(apasiLocalScoringSystemValue.getFacetCalculatedValue('erythema').intensity).to.be.within(
      0,
      100
    );
    expect(apasiLocalScoringSystemValue.getFacetCalculatedValue('erythema').value).to.be.within(
      0,
      4
    );

    expect(apasiLocalScoringSystemValue.getFacetCalculatedValue('induration').intensity).to.not.be
      .null;
    expect(
      apasiLocalScoringSystemValue.getFacetCalculatedValue('induration').intensity
    ).to.be.within(0, 100);
    expect(apasiLocalScoringSystemValue.getFacetCalculatedValue('induration').value).to.be.within(
      0,
      4
    );

    expect(apasiLocalScoringSystemValue.getFacetCalculatedValue('surface').intensity).to.not.be
      .null;
    expect(apasiLocalScoringSystemValue.getFacetCalculatedValue('surface').intensity).to.be.within(
      0,
      100
    );
    expect(apasiLocalScoringSystemValue.getFacetCalculatedValue('surface').value).to.be.within(
      0,
      6
    );

    // DLQI
    const dlqiScoringSystemValue = response.getScoringSystemValues('DLQI');
    expect(dlqiScoringSystemValue.getScore().questionnaireScore).greaterThanOrEqual(0);

    // PURE4
    const pure4ScoringSystemValue = response.getScoringSystemValues('PURE4');
    expect(pure4ScoringSystemValue.getScore().questionnaireScore).greaterThanOrEqual(0);

    // PASI_LOCAL
    const pasiScoringSystemValue = response.getScoringSystemValues('PASI_LOCAL');
    expect(pasiScoringSystemValue.getScore().questionnaireScore).greaterThanOrEqual(0);
  });

  it('should work with acne followup', async function () {
    const mediaAnalyzer = new MediaAnalyzer(env.parsed.API_URL, env.parsed.API_KEY);

    const imagePath = path.resolve('./test/resources/acne.jpg');
    const image = readFileSync(imagePath, {encoding: 'base64'});

    const previousImagePath = path.resolve('./test/resources/acne.jpg');
    const previousImage = readFileSync(previousImagePath, {encoding: 'base64'});
    const previousImageDate = subMonths(new Date(), 1);

    const dlqi = new DlqiQuestionnaire(1, 1, 2, 0, 0, 0, 1, 2, 2, 0);
    const questionnaires = new Questionnaires([dlqi]);

    const followUpArguments = new FollowUpArguments(
      generateRandomString(15),
      image,
      'Acne',
      BodySiteCode.HeadFront,
      [new PreviousMedia(previousImage, previousImageDate)],
      Operator.Patient,
      new Subject(
        generateRandomString(15),
        Gender.Male,
        '1.75',
        '69.00',
        new Date(),
        generateRandomString(15),
        new Company(generateRandomString(), 'Company Name')
      ),
      ['DLQI', 'ALEGI'],
      questionnaires
    );
    const response = await mediaAnalyzer.followUp(followUpArguments);

    expect(response.preliminaryFindings.hasConditionSuspicion).greaterThanOrEqual(0);
    expect(response.preliminaryFindings.isPreMalignantSuspicion).greaterThanOrEqual(0);
    expect(response.preliminaryFindings.needsBiopsySuspicion).greaterThanOrEqual(0);
    expect(response.preliminaryFindings.needsSpecialistsAttention).greaterThanOrEqual(0);

    expect(response.modality).to.not.be.null;

    const mediaValidity = response.mediaValidity;
    expect(mediaValidity.isValid).to.be.true;
    expect(mediaValidity.diqaScore).greaterThan(0);
    mediaValidity.validityMetrics.forEach(function (validityMetric) {
      expect(validityMetric.pass).to.be.true;
      expect(validityMetric.name).to.be.not.empty;
    });

    const metrics = response.metricsValue;
    expect(metrics.sensitivity).greaterThan(0);
    expect(metrics.specificity).greaterThan(0);

    expect(response.explainabilityMedia).to.not.be.null;

    expect(response.iaSeconds).greaterThan(0);

    expect(response.scoringSystemsValues).to.have.lengthOf(2);

    // ALEGI
    const alegiLocalScoringSystemValue = response.getScoringSystemValues('ALEGI');
    expect(alegiLocalScoringSystemValue.getScore().calculatedScore).greaterThanOrEqual(0);
    expect(alegiLocalScoringSystemValue.getScore().category).to.not.be.null;

    expect(alegiLocalScoringSystemValue.getFacetCalculatedValue('lesionDensity').intensity).to.not
      .be.null;
    expect(
      alegiLocalScoringSystemValue.getFacetCalculatedValue('lesionDensity').intensity
    ).to.be.within(0, 100);
    expect(
      alegiLocalScoringSystemValue.getFacetCalculatedValue('lesionDensity').value
    ).to.be.within(0, 4);

    expect(alegiLocalScoringSystemValue.getFacetCalculatedValue('lesionNumber').intensity).to.not.be
      .null;
    expect(
      alegiLocalScoringSystemValue.getFacetCalculatedValue('lesionNumber').intensity
    ).to.be.within(0, 100);
    expect(alegiLocalScoringSystemValue.getFacetCalculatedValue('lesionNumber').value).greaterThan(
      0
    );

    // DLQI
    const dlqiScoringSystemValue = response.getScoringSystemValues('DLQI');
    expect(dlqiScoringSystemValue.getScore().questionnaireScore).greaterThanOrEqual(0);
  });

  it('should work with urticaria followup', async function () {
    const mediaAnalyzer = new MediaAnalyzer(env.parsed.API_URL, env.parsed.API_KEY);

    const imagePath = path.resolve('./test/resources/urticaria.jpg');
    const image = readFileSync(imagePath, {encoding: 'base64'});

    const previousImagePath = path.resolve('./test/resources/urticaria.jpg');
    const previousImage = readFileSync(previousImagePath, {encoding: 'base64'});
    const previousImageDate = subMonths(new Date(), 1);

    const auasLocal = new AuasLocalQuestionnaire(2);
    const uasLocal = new UasLocalQuestionnaire(2, 5);
    const dlqi = new DlqiQuestionnaire(1, 1, 2, 0, 0, 0, 1, 2, 2, 0);
    const questionnaires = new Questionnaires([dlqi, auasLocal, uasLocal]);

    const followUpArguments = new FollowUpArguments(
      generateRandomString(15),
      image,
      'Hives urticaria',
      BodySiteCode.ArmLeft,
      [new PreviousMedia(previousImage, previousImageDate)],
      Operator.Patient,
      new Subject(
        generateRandomString(15),
        Gender.Male,
        '1.75',
        '69.00',
        new Date(),
        generateRandomString(15),
        new Company(generateRandomString(), 'Company Name')
      ),
      questionnaires.questionnaires.map((q) => q.getName()),
      questionnaires
    );
    const response = await mediaAnalyzer.followUp(followUpArguments);

    expect(response.preliminaryFindings.hasConditionSuspicion).greaterThanOrEqual(0);
    expect(response.preliminaryFindings.isPreMalignantSuspicion).greaterThanOrEqual(0);
    expect(response.preliminaryFindings.needsBiopsySuspicion).greaterThanOrEqual(0);
    expect(response.preliminaryFindings.needsSpecialistsAttention).greaterThanOrEqual(0);

    expect(response.modality).to.not.be.null;

    const mediaValidity = response.mediaValidity;
    expect(mediaValidity.isValid).to.be.true;
    expect(mediaValidity.diqaScore).greaterThan(0);
    mediaValidity.validityMetrics.forEach(function (validityMetric) {
      expect(validityMetric.pass).to.be.true;
      expect(validityMetric.name).to.be.not.empty;
    });

    const metrics = response.metricsValue;
    expect(metrics.sensitivity).greaterThan(0);
    expect(metrics.specificity).greaterThan(0);

    expect(response.explainabilityMedia).to.not.be.null;

    expect(response.iaSeconds).greaterThan(0);

    expect(response.scoringSystemsValues).to.have.lengthOf(3);

    //AUAS_LOCAL
    const auasLocalScoringSystemValue = response.getScoringSystemValues('AUAS_LOCAL');
    expect(auasLocalScoringSystemValue.getScore().calculatedScore).greaterThanOrEqual(0);
    expect(auasLocalScoringSystemValue.getScore().category).to.not.be.null;

    expect(auasLocalScoringSystemValue.getFacetCalculatedValue('hiveNumber').intensity).to.not.be
      .null;
    expect(
      auasLocalScoringSystemValue.getFacetCalculatedValue('hiveNumber').intensity
    ).greaterThanOrEqual(0);
    expect(
      auasLocalScoringSystemValue.getFacetCalculatedValue('hiveNumber').value
    ).greaterThanOrEqual(0);

    expect(auasLocalScoringSystemValue.getFacetCalculatedValue('itchiness').intensity).to.not.be
      .null;
    expect(auasLocalScoringSystemValue.getFacetCalculatedValue('itchiness').intensity).to.be.within(
      0,
      100
    );
    expect(auasLocalScoringSystemValue.getFacetCalculatedValue('itchiness').value).to.be.within(
      0,
      3
    );

    // DLQI
    const dlqiScoringSystemValue = response.getScoringSystemValues('DLQI');
    expect(dlqiScoringSystemValue.getScore().questionnaireScore).greaterThanOrEqual(0);

    // UAS_LOCAL
    const uasLocalScoringSystemValue = response.getScoringSystemValues('UAS_LOCAL');
    expect(uasLocalScoringSystemValue.getScore().questionnaireScore).greaterThanOrEqual(0);
  });

  it('should work with atopic dermatitis followup', async function () {
    const mediaAnalyzer = new MediaAnalyzer(env.parsed.API_URL, env.parsed.API_KEY);

    const imagePath = path.resolve('./test/resources/dermatitis.jpg');
    const image = readFileSync(imagePath, {encoding: 'base64'});

    const previousImagePath = path.resolve('./test/resources/dermatitis.jpg');
    const previousImage = readFileSync(previousImagePath, {encoding: 'base64'});
    const previousImageDate = subMonths(new Date(), 1);

    const ascoradLocal = new AscoradLocalQuestionnaire(27, 2, 3);
    const dlqi = new DlqiQuestionnaire(1, 1, 2, 0, 0, 0, 1, 2, 2, 0);
    const questionnaires = new Questionnaires([dlqi, ascoradLocal]);

    const followUpArguments = new FollowUpArguments(
      generateRandomString(15),
      image,
      'Atopic dermatitis',
      BodySiteCode.ArmLeft,
      [new PreviousMedia(previousImage, previousImageDate)],
      Operator.Patient,
      new Subject(
        generateRandomString(15),
        Gender.Male,
        '1.75',
        '69.00',
        new Date(),
        generateRandomString(15),
        new Company(generateRandomString(), 'Company Name')
      ),
      questionnaires.questionnaires.map((q) => q.getName()),
      questionnaires
    );
    const response = await mediaAnalyzer.followUp(followUpArguments);

    expect(response.preliminaryFindings.hasConditionSuspicion).greaterThanOrEqual(0);
    expect(response.preliminaryFindings.isPreMalignantSuspicion).greaterThanOrEqual(0);
    expect(response.preliminaryFindings.needsBiopsySuspicion).greaterThanOrEqual(0);
    expect(response.preliminaryFindings.needsSpecialistsAttention).greaterThanOrEqual(0);

    expect(response.modality).to.not.be.null;

    const mediaValidity = response.mediaValidity;
    expect(mediaValidity.isValid).to.be.true;
    expect(mediaValidity.diqaScore).greaterThan(0);
    mediaValidity.validityMetrics.forEach(function (validityMetric) {
      expect(validityMetric.pass).to.be.true;
      expect(validityMetric.name).to.be.not.empty;
    });

    const metrics = response.metricsValue;
    expect(metrics.sensitivity).greaterThan(0);
    expect(metrics.specificity).greaterThan(0);

    expect(response.explainabilityMedia).to.not.be.null;

    expect(response.iaSeconds).greaterThan(0);

    expect(response.scoringSystemsValues).to.have.lengthOf(2);

    // ASCORAD_LOCAL
    const ascoradLocalScoringSystemValue = response.getScoringSystemValues('ASCORAD_LOCAL');
    expect(ascoradLocalScoringSystemValue.getScore().calculatedScore).greaterThanOrEqual(0);
    expect(ascoradLocalScoringSystemValue.getScore().category).to.not.be.null;

    expect(ascoradLocalScoringSystemValue.getFacetCalculatedValue('crusting').intensity).to.not.be
      .null;
    expect(
      ascoradLocalScoringSystemValue.getFacetCalculatedValue('crusting').intensity
    ).to.be.within(0, 100);
    expect(ascoradLocalScoringSystemValue.getFacetCalculatedValue('crusting').value).to.be.within(
      0,
      3
    );

    expect(ascoradLocalScoringSystemValue.getFacetCalculatedValue('dryness').intensity).to.not.be
      .null;
    expect(
      ascoradLocalScoringSystemValue.getFacetCalculatedValue('dryness').intensity
    ).to.be.within(0, 100);
    expect(ascoradLocalScoringSystemValue.getFacetCalculatedValue('crusting').value).to.be.within(
      0,
      3
    );

    expect(ascoradLocalScoringSystemValue.getFacetCalculatedValue('erythema').intensity).to.not.be
      .null;
    expect(
      ascoradLocalScoringSystemValue.getFacetCalculatedValue('erythema').intensity
    ).to.be.within(0, 100);
    expect(ascoradLocalScoringSystemValue.getFacetCalculatedValue('erythema').value).to.be.within(
      0,
      3
    );

    expect(ascoradLocalScoringSystemValue.getFacetCalculatedValue('excoriation').intensity).to.not
      .be.null;
    expect(
      ascoradLocalScoringSystemValue.getFacetCalculatedValue('excoriation').intensity
    ).to.be.within(0, 100);
    expect(
      ascoradLocalScoringSystemValue.getFacetCalculatedValue('excoriation').value
    ).to.be.within(0, 3);

    expect(ascoradLocalScoringSystemValue.getFacetCalculatedValue('lichenification').intensity).to
      .not.be.null;
    expect(
      ascoradLocalScoringSystemValue.getFacetCalculatedValue('lichenification').intensity
    ).to.be.within(0, 100);
    expect(
      ascoradLocalScoringSystemValue.getFacetCalculatedValue('lichenification').value
    ).to.be.within(0, 3);

    expect(ascoradLocalScoringSystemValue.getFacetCalculatedValue('swelling').intensity).to.not.be
      .null;
    expect(
      ascoradLocalScoringSystemValue.getFacetCalculatedValue('swelling').intensity
    ).to.be.within(0, 100);
    expect(ascoradLocalScoringSystemValue.getFacetCalculatedValue('swelling').value).to.be.within(
      0,
      3
    );

    // DLQI
    const dlqiScoringSystemValue = response.getScoringSystemValues('DLQI');
    expect(dlqiScoringSystemValue.getScore().questionnaireScore).greaterThanOrEqual(0);
  });

  it('should work with hidradenitis followup', async function () {
    const mediaAnalyzer = new MediaAnalyzer(env.parsed.API_URL, env.parsed.API_KEY);

    const imagePath = path.resolve('./test/resources/hidradenitis_01.png');
    const image = readFileSync(imagePath, {encoding: 'base64'});

    const previousImagePath = path.resolve('./test/resources/hidradenitis_01.png');
    const previousImage = readFileSync(previousImagePath, {encoding: 'base64'});
    const previousImageDate = subMonths(new Date(), 1);

    const ihs4Local = new Ihs4LocalQuestionnaire(1, 2, 1);
    const dlqi = new DlqiQuestionnaire(1, 1, 2, 0, 0, 0, 1, 2, 2, 0);
    const questionnaires = new Questionnaires([dlqi, ihs4Local]);

    const followUpArguments = new FollowUpArguments(
      generateRandomString(15),
      image,
      'Hidradenitis suppurativa',
      BodySiteCode.ArmLeft,
      [new PreviousMedia(previousImage, previousImageDate)],
      Operator.Patient,
      new Subject(
        generateRandomString(15),
        Gender.Male,
        '1.75',
        '69.00',
        new Date(),
        generateRandomString(15),
        new Company(generateRandomString(), 'Company Name')
      ),
      ['AIHS4_LOCAL', 'IHS4_LOCAL', 'DLQI'],
      questionnaires
    );
    const response = await mediaAnalyzer.followUp(followUpArguments);

    expect(response.preliminaryFindings.hasConditionSuspicion).greaterThanOrEqual(0);
    expect(response.preliminaryFindings.isPreMalignantSuspicion).greaterThanOrEqual(0);
    expect(response.preliminaryFindings.needsBiopsySuspicion).greaterThanOrEqual(0);
    expect(response.preliminaryFindings.needsSpecialistsAttention).greaterThanOrEqual(0);

    expect(response.modality).to.not.be.null;

    const mediaValidity = response.mediaValidity;
    expect(mediaValidity.isValid).to.be.true;
    expect(mediaValidity.diqaScore).greaterThan(0);
    mediaValidity.validityMetrics.forEach(function (validityMetric) {
      expect(validityMetric.pass).to.be.true;
      expect(validityMetric.name).to.be.not.empty;
    });

    const metrics = response.metricsValue;
    expect(metrics.sensitivity).greaterThan(0);
    expect(metrics.specificity).greaterThan(0);

    expect(response.explainabilityMedia).to.not.be.null;

    expect(response.iaSeconds).greaterThan(0);

    expect(response.scoringSystemsValues).to.have.lengthOf(3);

    // AIHS4_LOCAL
    const aihs4LocalScoringSystemValue = response.getScoringSystemValues('AIHS4_LOCAL');
    expect(aihs4LocalScoringSystemValue.getScore().calculatedScore).greaterThanOrEqual(0);
    expect(aihs4LocalScoringSystemValue.getScore().category).to.not.be.null;

    expect(
      aihs4LocalScoringSystemValue.getFacetCalculatedValue('abscesseNumber').value
    ).greaterThanOrEqual(0);
    expect(
      aihs4LocalScoringSystemValue.getFacetCalculatedValue('drainingTunnelNumber').value
    ).greaterThanOrEqual(0);
    expect(
      aihs4LocalScoringSystemValue.getFacetCalculatedValue('noduleNumber').value
    ).greaterThanOrEqual(0);

    // DLQI
    const dlqiScoringSystemValue = response.getScoringSystemValues('DLQI');
    expect(dlqiScoringSystemValue.getScore().questionnaireScore).greaterThanOrEqual(0);

    // IHS4_LOCAL
    const ihs4ScoringSystemValue = response.getScoringSystemValues('IHS4_LOCAL');
    expect(ihs4ScoringSystemValue.getScore().questionnaireScore).greaterThanOrEqual(0);
  });
});
