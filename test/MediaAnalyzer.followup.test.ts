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

const apiUrl = env.parsed?.API_URL;
if (!apiUrl) {
  throw new Error('API_URL is not defined in .env.local file');
}

const apiKey = env.parsed?.API_KEY;
if (!apiKey) {
  throw new Error('API_KEY is not defined in .env.local file');
}

describe('Test followup requests', () => {
  it('should work with psoriasis followup', async function () {
    const mediaAnalyzer = new MediaAnalyzer(apiUrl, apiKey);

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
    expect(response.preliminaryFindings.isMalignantSuspicion).greaterThanOrEqual(0);
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

    expect(response.scoringSystemsResults).to.have.lengthOf(4);

    // APASI
    const apasiLocalResult = response.getScoringSystemResult('APASI_LOCAL');
    expect(apasiLocalResult).to.not.be.null;
    if (apasiLocalResult) {
      expect(apasiLocalResult.getScore().score).greaterThanOrEqual(0);
      expect(apasiLocalResult.getScore().category).to.not.be.null;

      expect(apasiLocalResult.getFacetScore('desquamation').intensity).to.not.be.null;
      expect(apasiLocalResult.getFacetScore('desquamation').intensity).to.be.within(0, 100);
      expect(apasiLocalResult.getFacetScore('desquamation').value).to.be.within(0, 4);

      expect(apasiLocalResult.getFacetScore('erythema').intensity).to.not.be.null;
      expect(apasiLocalResult.getFacetScore('erythema').intensity).to.be.within(0, 100);
      expect(apasiLocalResult.getFacetScore('erythema').value).to.be.within(0, 4);

      expect(apasiLocalResult.getFacetScore('induration').intensity).to.not.be.null;
      expect(apasiLocalResult.getFacetScore('induration').intensity).to.be.within(0, 100);
      expect(apasiLocalResult.getFacetScore('induration').value).to.be.within(0, 4);

      expect(apasiLocalResult.getFacetScore('surface').intensity).to.not.be.null;
      expect(apasiLocalResult.getFacetScore('surface').intensity).to.be.within(0, 100);
      expect(apasiLocalResult.getFacetScore('surface').value).to.be.within(0, 6);
    }

    // DLQI
    const dlqiResult = response.getScoringSystemResult('DLQI');
    expect(dlqiResult).to.not.be.null;
    if (dlqiResult) {
      expect(dlqiResult.getScore().score).greaterThanOrEqual(0);
      expect(dlqiResult.getScore().category).to.not.be.null;
      for (let i = 1; i <= 10; i++) {
        const facetCode = `question${i}`;
        const facetScore = dlqiResult.getFacetScore(facetCode);
        expect(facetScore.intensity).to.be.null;
        expect(facetScore.value).to.be.within(0, 3);
      }
    }

    // PURE4
    const pure4Result = response.getScoringSystemResult('PURE4');
    expect(pure4Result).to.not.be.null;
    if (pure4Result) {
      expect(pure4Result.getScore().score).greaterThanOrEqual(0);
      expect(pure4Result.getScore().category).to.not.be.null;
      for (let i = 1; i <= 4; i++) {
        const facetCode = `question${i}Pure`;
        const facetScore = pure4Result.getFacetScore(facetCode);
        expect(facetScore.intensity).to.be.null;
        expect(facetScore.value).to.be.within(0, 3);
      }
    }

    // PASI_LOCAL
    const pasiResult = response.getScoringSystemResult('PASI_LOCAL');
    expect(pasiResult).to.not.be.null;
    if (pasiResult) {
      expect(pasiResult.getScore().category).to.not.be.null;
      expect(pasiResult.getFacetScore('desquamation').intensity).to.be.null;
      expect(pasiResult.getFacetScore('desquamation').value).to.be.within(0, 4);
      expect(pasiResult.getFacetScore('erythema').intensity).to.be.null;
      expect(pasiResult.getFacetScore('erythema').value).to.be.within(0, 4);
      expect(pasiResult.getFacetScore('induration').intensity).to.be.null;
      expect(pasiResult.getFacetScore('induration').value).to.be.within(0, 4);
      expect(pasiResult.getFacetScore('surface').intensity).to.be.null;
      expect(pasiResult.getFacetScore('surface').value).to.be.within(0, 6);
    }
  });

  it('should work with acne followup', async function () {
    const mediaAnalyzer = new MediaAnalyzer(apiUrl, apiKey);

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
    expect(response.preliminaryFindings.isMalignantSuspicion).greaterThanOrEqual(0);
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

    expect(response.scoringSystemsResults).to.have.lengthOf(2);

    // ALEGI
    const alegiResult = response.getScoringSystemResult('ALEGI');
    expect(alegiResult).to.not.be.null;
    if (alegiResult) {
      expect(alegiResult.getScore().score).greaterThanOrEqual(0);
      expect(alegiResult.getScore().category).to.not.be.null;
      expect(alegiResult.getFacetScore('lesionDensity').intensity).to.not.be.null;
      expect(alegiResult.getFacetScore('lesionDensity').intensity).greaterThanOrEqual(0);
      expect(alegiResult.getFacetScore('lesionDensity').intensity).lessThanOrEqual(100);
      expect(alegiResult.getFacetScore('lesionDensity').value).to.not.be.null;
      expect(alegiResult.getFacetScore('lesionDensity').value).greaterThanOrEqual(0);
      expect(alegiResult.getFacetScore('lesionDensity').value).lessThanOrEqual(4);
      expect(alegiResult.getFacetScore('lesionNumber').intensity).to.not.be.null;
      expect(alegiResult.getFacetScore('lesionNumber').intensity).greaterThanOrEqual(0);
      expect(alegiResult.getFacetScore('lesionNumber').intensity).lessThanOrEqual(100);
      expect(alegiResult.getFacetScore('lesionNumber').value).to.not.be.null;
      expect(alegiResult.getFacetScore('lesionNumber').value).greaterThan(0);
    }

    // DLQI
    const dlqiResult = response.getScoringSystemResult('DLQI');
    expect(dlqiResult).to.not.be.null;
    if (dlqiResult) {
      expect(dlqiResult.getScore().score).greaterThanOrEqual(0);
      expect(dlqiResult.getScore().category).to.not.be.null;
      for (let i = 1; i <= 10; i++) {
        const facetCode = `question${i}`;
        const facetScore = dlqiResult.getFacetScore(facetCode);
        expect(facetScore.intensity).to.be.null;
        expect(facetScore.value).to.be.within(0, 3);
      }
    }
  });

  it('should work with urticaria followup', async function () {
    const mediaAnalyzer = new MediaAnalyzer(apiUrl, apiKey);

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
    expect(response.preliminaryFindings.isMalignantSuspicion).greaterThanOrEqual(0);
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

    expect(response.scoringSystemsResults).to.have.lengthOf(3);

    //AUAS_LOCAL
    const auasLocalResult = response.getScoringSystemResult('AUAS_LOCAL');
    expect(auasLocalResult).to.not.be.null;
    if (auasLocalResult) {
      expect(auasLocalResult.getScore().score).greaterThanOrEqual(0);
      expect(auasLocalResult.getScore().category).to.not.be.null;
      expect(auasLocalResult.getFacetScore('hiveNumber').intensity).to.not.be.null;
      expect(auasLocalResult.getFacetScore('hiveNumber').value).greaterThanOrEqual(0);
      expect(auasLocalResult.getFacetScore('hiveNumber').intensity).greaterThanOrEqual(0);
      expect(auasLocalResult.getFacetScore('itchiness').intensity).to.be.null;
      expect(auasLocalResult.getFacetScore('itchiness').value).to.be.within(0, 3);
    }

    // DLQI
    const dlqiResult = response.getScoringSystemResult('DLQI');
    expect(dlqiResult).to.not.be.null;
    if (dlqiResult) {
      expect(dlqiResult.getScore().score).greaterThanOrEqual(0);
      expect(dlqiResult.getScore().category).to.not.be.null;
      for (let i = 1; i <= 10; i++) {
        const facetCode = `question${i}`;
        const facetScore = dlqiResult.getFacetScore(facetCode);
        expect(facetScore.intensity).to.be.null;
        expect(facetScore.value).to.be.within(0, 3);
      }
    }

    // UAS_LOCAL
    const uasLocalResult = response.getScoringSystemResult('UAS_LOCAL');
    expect(uasLocalResult).to.not.be.null;
    if (uasLocalResult) {
      expect(uasLocalResult.getScore().score).greaterThanOrEqual(0);
      expect(uasLocalResult.getScore().category).to.not.be.null;
      expect(uasLocalResult.getFacetScore('hiveNumber').intensity).to.be.null;
      expect(uasLocalResult.getFacetScore('hiveNumber').value).greaterThanOrEqual(0);
      expect(uasLocalResult.getFacetScore('itchiness').intensity).to.be.null;
      expect(uasLocalResult.getFacetScore('itchiness').value).to.be.within(0, 4);
    }
  });

  it('should work with atopic dermatitis followup', async function () {
    const mediaAnalyzer = new MediaAnalyzer(apiUrl, apiKey);

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
    expect(response.preliminaryFindings.isMalignantSuspicion).greaterThanOrEqual(0);
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

    expect(response.scoringSystemsResults).to.have.lengthOf(2);

    // ASCORAD_LOCAL
    const ascoradLocalResult = response.getScoringSystemResult('ASCORAD_LOCAL');
    expect(ascoradLocalResult).to.not.be.null;
    if (ascoradLocalResult) {
      expect(ascoradLocalResult.getScore().score).greaterThanOrEqual(0);
      expect(ascoradLocalResult.getScore().category).to.not.be.null;

      expect(ascoradLocalResult.getFacetScore('crusting').intensity).to.not.be.null;
      expect(ascoradLocalResult.getFacetScore('crusting').intensity).to.be.within(0, 100);
      expect(ascoradLocalResult.getFacetScore('crusting').value).to.be.within(0, 3);

      expect(ascoradLocalResult.getFacetScore('dryness').intensity).to.not.be.null;
      expect(ascoradLocalResult.getFacetScore('dryness').intensity).to.be.within(0, 100);
      expect(ascoradLocalResult.getFacetScore('dryness').value).to.be.within(0, 3);

      expect(ascoradLocalResult.getFacetScore('erythema').intensity).to.not.be.null;
      expect(ascoradLocalResult.getFacetScore('erythema').intensity).to.be.within(0, 100);
      expect(ascoradLocalResult.getFacetScore('erythema').value).to.be.within(0, 3);

      expect(ascoradLocalResult.getFacetScore('excoriation').intensity).to.not.be.null;
      expect(ascoradLocalResult.getFacetScore('excoriation').intensity).to.be.within(0, 100);
      expect(ascoradLocalResult.getFacetScore('excoriation').value).to.be.within(0, 3);

      expect(ascoradLocalResult.getFacetScore('lichenification').intensity).to.not.be.within(
        0,
        100
      );
      expect(ascoradLocalResult.getFacetScore('lichenification').intensity).to.be.within(0, 100);
      expect(ascoradLocalResult.getFacetScore('lichenification').value).to.be.within(0, 3);

      expect(ascoradLocalResult.getFacetScore('swelling').intensity).to.not.be.within(0, 100);
      expect(ascoradLocalResult.getFacetScore('swelling').intensity).to.be.within(0, 100);
      expect(ascoradLocalResult.getFacetScore('swelling').value).to.be.within(0, 3);

      expect(ascoradLocalResult.getFacetScore('itchinessScorad').intensity).to.be.null;
      expect(ascoradLocalResult.getFacetScore('itchinessScorad').intensity).to.be.within(0, 10);

      expect(ascoradLocalResult.getFacetScore('sleeplessness').intensity).to.be.null;
      expect(ascoradLocalResult.getFacetScore('sleeplessness').intensity).to.be.within(0, 10);

      expect(ascoradLocalResult.getFacetScore('sleeplessness').intensity).to.be.null;
      expect(ascoradLocalResult.getFacetScore('sleeplessness').intensity).to.be.within(0, 100);
    }

    // DLQI
    const dlqiResult = response.getScoringSystemResult('DLQI');
    expect(dlqiResult).to.not.be.null;
    if (dlqiResult) {
      expect(dlqiResult.getScore().score).greaterThanOrEqual(0);
      expect(dlqiResult.getScore().category).to.not.be.null;
      for (let i = 1; i <= 10; i++) {
        const facetCode = `question${i}`;
        const facetScore = dlqiResult.getFacetScore(facetCode);
        expect(facetScore.intensity).to.be.null;
        expect(facetScore.value).to.be.within(0, 3);
      }
    }
  });

  it('should work with hidradenitis followup', async function () {
    const mediaAnalyzer = new MediaAnalyzer(apiUrl, apiKey);

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
    expect(response.preliminaryFindings.isMalignantSuspicion).greaterThanOrEqual(0);
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

    expect(response.scoringSystemsResults).to.have.lengthOf(3);

    // AIHS4_LOCAL
    const aihs4LocalResult = response.getScoringSystemResult('AIHS4_LOCAL');
    expect(aihs4LocalResult).to.not.be.null;
    if (aihs4LocalResult) {
      expect(aihs4LocalResult.getScore().score).greaterThanOrEqual(0);
      expect(aihs4LocalResult.getScore().category).to.not.be.null;

      expect(aihs4LocalResult.getFacetScore('abscesseNumber').value).greaterThanOrEqual(0);
      expect(aihs4LocalResult.getFacetScore('drainingTunnelNumber').value).greaterThanOrEqual(0);
      expect(aihs4LocalResult.getFacetScore('noduleNumber').value).greaterThanOrEqual(0);
    }

    // DLQI
    const dlqiResult = response.getScoringSystemResult('DLQI');
    expect(dlqiResult).to.not.be.null;
    if (dlqiResult) {
      expect(dlqiResult.getScore().score).greaterThanOrEqual(0);
      expect(dlqiResult.getScore().category).to.not.be.null;
      for (let i = 1; i <= 10; i++) {
        const facetCode = `question${i}`;
        const facetScore = dlqiResult.getFacetScore(facetCode);
        expect(facetScore.intensity).to.be.null;
        expect(facetScore.value).to.be.within(0, 3);
      }
    }

    // IHS4_LOCAL
    const ihs4LocalResult = response.getScoringSystemResult('IHS4_LOCAL');
    expect(ihs4LocalResult).to.not.be.null;
    if (ihs4LocalResult) {
      expect(ihs4LocalResult.getScore().score).greaterThanOrEqual(0);
      expect(ihs4LocalResult.getScore().category).to.not.be.null;
      ['abscesseNumber', 'drainingTunnelNumber', 'noduleNumber'].forEach(function (facetCode) {
        const facetScore = ihs4LocalResult.getFacetScore(facetCode);
        expect(facetScore.value).greaterThanOrEqual(0);
        expect(facetScore.intensity).to.be.null;
      });
    }
  });
});
