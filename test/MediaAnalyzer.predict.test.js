import path from 'path';
import {expect} from 'chai';
import {readFileSync} from 'fs';
import dotenv from 'dotenv';
import generateRandomString from './generateRandomString';
import MediaAnalyzer from '../lib/MediaAnalyzer';
import PredictArguments from '../lib/MediaAnalyzerArguments/PredictArguments';
import BodySiteCode from '../lib/MediaAnalyzerArguments/BodySite/BodySiteCode';
import Operator from '../lib/MediaAnalyzerArguments/Operator/Operator';
import Subject from '../lib/MediaAnalyzerArguments/Subject/Subject';
import Gender from '../lib/MediaAnalyzerArguments/Subject/Gender';
import Company from '../lib/MediaAnalyzerArguments/Subject/Company';

const env = dotenv.config({path: '.env.local'});

describe('Test predict requests', () => {
  it('should send a base predict request', async function () {
    const mediaAnalyzer = new MediaAnalyzer(env.parsed.API_URL, env.parsed.API_KEY);

    const imagePath = path.resolve('./test/resources/acne.jpg');
    const image = readFileSync(imagePath, {encoding: 'base64'});
    const predictArguments = new PredictArguments(generateRandomString(15), image);
    const response = await mediaAnalyzer.predict(predictArguments);

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

    expect(response.explainabilityMedia).to.be.null;

    expect(response.scoringSystemsValues).to.be.empty;

    expect(response.conclusions).to.be.not.empty;
    const firstConclusion = response.conclusions[0];
    expect(firstConclusion.conclusionCode.code).to.be.not.empty;
    expect(firstConclusion.conclusionCode.codeSystem).to.be.not.empty;
    expect(firstConclusion.pathologyCode).to.be.not.empty;
    expect(firstConclusion.probability).greaterThan(0);

    expect(response.iaSeconds).greaterThan(0);
  });

  it('should send a predict request', async function () {
    const mediaAnalyzer = new MediaAnalyzer(env.parsed.API_URL, env.parsed.API_KEY);

    const imagePath = path.resolve('./test/resources/acne.jpg');
    const image = readFileSync(imagePath, {encoding: 'base64'});
    const predictArguments = new PredictArguments(
      generateRandomString(15),
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
    const response = await mediaAnalyzer.predict(predictArguments);

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

    expect(response.explainabilityMedia).to.be.null;

    expect(response.scoringSystemsValues).to.be.empty;

    expect(response.conclusions).to.be.not.empty;
    const firstConclusion = response.conclusions[0];
    expect(firstConclusion.conclusionCode.code).to.be.not.empty;
    expect(firstConclusion.conclusionCode.codeSystem).to.be.not.empty;
    expect(firstConclusion.pathologyCode).to.be.not.empty;
    expect(firstConclusion.probability).greaterThan(0);

    expect(response.iaSeconds).greaterThan(0);
  });

  it('should send a base predict request with invalid image', async function () {
    const mediaAnalyzer = new MediaAnalyzer(env.parsed.API_URL, env.parsed.API_KEY);

    const imagePath = path.resolve('./test/resources/invalid.png');
    const image = readFileSync(imagePath, {encoding: 'base64'});
    const predictArguments = new PredictArguments(generateRandomString(15), image);
    const response = await mediaAnalyzer.predict(predictArguments);

    expect(response.preliminaryFindings.hasConditionSuspicion).greaterThanOrEqual(0);
    expect(response.preliminaryFindings.isPreMalignantSuspicion).greaterThanOrEqual(0);
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

    expect(response.explainabilityMedia).to.be.null;

    expect(response.scoringSystemsValues).to.be.empty;

    expect(response.iaSeconds).greaterThan(0);
  });
});
