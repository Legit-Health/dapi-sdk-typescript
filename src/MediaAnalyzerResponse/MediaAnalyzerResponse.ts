import AiResponse from '../AiResponse';
import Conclusion from './Conclusion/Conclusion';
import MediaValidity from './MediaValidity/MediaValidity';
import ValidityMetric from './MediaValidity/ValidityMetric';
import MetricsValue from './MetricsValue';
import PreliminaryFindingsValue from './PreliminaryFindingsValue';
import ScoringSystemValues from './ScoringSystem/ScoringSystemValues';

export function createFromJson(json: AiResponse): MediaAnalyzerResponse {
  const preliminaryFindings = new PreliminaryFindingsValue(
    json.preliminaryFindings.hasConditionSuspicion,
    json.preliminaryFindings.isPreMalignantSuspicion,
    json.preliminaryFindings.isMalignantSuspicion ?? null,
    json.preliminaryFindings.needsBiopsySuspicion,
    json.preliminaryFindings.needsSpecialistsAttention
  );

  const modality = json.detectedModality;

  const isValid = json.mediaValidity.isValid;
  const diqaScore = json.mediaValidity.score;
  const mediaValidityMetrics = json.mediaValidity.metrics;
  const mediaValidity = new MediaValidity(isValid, diqaScore, mediaValidityMetrics);

  const metrics = new MetricsValue(json.metrics.sensitivity, json.metrics.specificity);
  const explainabilityMediaContent = json.explainabilityMedia.content;
  const explainabilityMedia =
    explainabilityMediaContent === null || explainabilityMediaContent === ''
      ? null
      : explainabilityMediaContent;

  const evolution = json.evolution;
  const scoringSystemsValues = evolution?.domains
    ? Object.keys(evolution.domains).map(
        (scoringSystemCode) =>
          new ScoringSystemValues(scoringSystemCode, evolution.domains[scoringSystemCode])
      )
    : [];

  const conclusions = json.conclusions
    ? json.conclusions
        .filter((singleConclusion) => singleConclusion.name)
        .map(
          (singleConclusion) =>
            new Conclusion(
              singleConclusion.name,
              singleConclusion.probability,
              singleConclusion.code.code,
              singleConclusion.code.codeSystem
            )
        )
    : [];

  const iaSeconds = json.time;

  return new MediaAnalyzerResponse(
    preliminaryFindings,
    modality,
    mediaValidity,
    metrics,
    explainabilityMedia,
    scoringSystemsValues,
    conclusions,
    iaSeconds
  );
}

export default class MediaAnalyzerResponse {
  constructor(
    readonly preliminaryFindings: PreliminaryFindingsValue,
    readonly modality: string,
    readonly mediaValidity: MediaValidity,
    readonly metricsValue: MetricsValue,
    readonly explainabilityMedia: string | null,
    readonly scoringSystemsValues: ScoringSystemValues[],
    readonly conclusions: Conclusion[],
    readonly iaSeconds: number
  ) {}

  getScoringSystemValues(scoringSystemCode: string): ScoringSystemValues | null {
    return (
      this.scoringSystemsValues.find(
        (scoringSystemValues) => scoringSystemValues.scoringSystemCode === scoringSystemCode
      ) ?? null
    );
  }

  getPossibleConclusions(): Conclusion[] {
    return this.conclusions.filter((conclusion) => conclusion.isPossible());
  }

  getFailedValidityMetric(): ValidityMetric | null {
    return this.mediaValidity.getFailedValidityMetric();
  }
}
