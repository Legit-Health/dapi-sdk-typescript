import path from 'path';
import {expect} from 'chai';
import {readFileSync} from 'fs';
import dotenv from 'dotenv';
import generateRandomString from './generateRandomString';
import {
  MediaAnalyzer,
  BodySiteCode,
  Operator,
  Subject,
  Gender,
  Company,
  PredictData,
  MediaAnalyzerArguments
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

describe('Test predict requests', () => {
  it('should send a base predict request', async function () {
    const mediaAnalyzer = new MediaAnalyzer(apiUrl, apiKey);

    const imagePath = path.resolve('./test/resources/acne.jpg');
    const image = readFileSync(imagePath, {encoding: 'base64'});
    const predictData = new PredictData(image);
    const mediaAnalyzerArguments = new MediaAnalyzerArguments(
      generateRandomString(15),
      predictData
    );
    const response = await mediaAnalyzer.predict(mediaAnalyzerArguments);

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

    expect(response.explainabilityMedia).to.be.not.null;

    expect(response.scoringSystemsResults).to.be.empty;

    expect(response.conclusions).to.be.not.empty;
    const firstConclusion = response.conclusions[0];
    expect(firstConclusion.conclusionCode.code).to.be.not.empty;
    expect(firstConclusion.conclusionCode.codeSystem).to.be.not.empty;
    expect(firstConclusion.pathologyCode).to.be.not.empty;
    expect(firstConclusion.probability).greaterThan(0);

    expect(response.iaSeconds).greaterThan(0);
  });

  it('should send a predict request', async function () {
    const mediaAnalyzer = new MediaAnalyzer(apiUrl, apiKey);

    const imagePath = path.resolve('./test/resources/acne.jpg');
    const image = readFileSync(imagePath, {encoding: 'base64'});
    const predictData = new PredictData(
      image,
      BodySiteCode.ArmLeft,
      Operator.Patient,
      new Subject(
        generateRandomString(15),
        Gender.Male,
        '1.75',
        '69.00',
        new Date(),
        generateRandomString(15),
        new Company(generateRandomString(), 'Company Name')
      )
    );
    const mediaAnalyzerArguments = new MediaAnalyzerArguments(
      generateRandomString(15),
      predictData
    );
    const response = await mediaAnalyzer.predict(mediaAnalyzerArguments);

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

    expect(response.explainabilityMedia).to.be.not.null;

    expect(response.scoringSystemsResults).to.be.empty;

    expect(response.conclusions).to.be.not.empty;
    const firstConclusion = response.conclusions[0];
    expect(firstConclusion.conclusionCode.code).to.be.not.empty;
    expect(firstConclusion.conclusionCode.codeSystem).to.be.not.empty;
    expect(firstConclusion.pathologyCode).to.be.not.empty;
    expect(firstConclusion.probability).greaterThan(0);

    expect(response.iaSeconds).greaterThan(0);
  });

  it('should send a base predict request with invalid image', async function () {
    const mediaAnalyzer = new MediaAnalyzer(apiUrl, apiKey);

    const imagePath = path.resolve('./test/resources/invalid.png');
    const image = readFileSync(imagePath, {encoding: 'base64'});
    const predictData = new PredictData(image);

    const mediaAnalyzerArguments = new MediaAnalyzerArguments(
      generateRandomString(15),
      predictData
    );
    const response = await mediaAnalyzer.predict(mediaAnalyzerArguments);

    expect(response.preliminaryFindings.hasConditionSuspicion).greaterThanOrEqual(0);
    expect(response.preliminaryFindings.isPreMalignantSuspicion).greaterThanOrEqual(0);
    expect(response.preliminaryFindings.isMalignantSuspicion).equals(null);
    expect(response.preliminaryFindings.needsBiopsySuspicion).greaterThanOrEqual(0);
    expect(response.preliminaryFindings.needsSpecialistsAttention).greaterThanOrEqual(0);

    expect(response.modality).to.not.be.null;

    const mediaValidity = response.mediaValidity;
    expect(mediaValidity.isValid).to.be.false;
    expect(mediaValidity.diqaScore).greaterThanOrEqual(0);

    mediaValidity.validityMetrics.forEach(function (validityMetric) {
      if (validityMetric.name === 'isDermatologyDomain') {
        expect(validityMetric.pass).to.be.false;
      }
      expect(validityMetric.name).to.be.not.empty;
    });

    const metrics = response.metricsValue;
    expect(metrics.sensitivity).greaterThan(0);
    expect(metrics.specificity).greaterThan(0);

    expect(response.explainabilityMedia).to.not.be.null;

    expect(response.scoringSystemsResults).to.be.empty;

    expect(response.iaSeconds).greaterThan(0);
  });
});
