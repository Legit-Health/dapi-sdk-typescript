import ValidityMetric from './ValidityMetric';

export default class MediaValidity {
  readonly validityMetrics: ValidityMetric[] = [];

  constructor(
    readonly isValid: boolean,
    readonly diqaScore: number,
    private readonly validityMetricsJson: Record<string, boolean>
  ) {
    this.validityMetrics = Object.keys(validityMetricsJson).map(
      (metricName) => new ValidityMetric(metricName, validityMetricsJson[metricName])
    );
  }

  getFailedValidityMetric(): ValidityMetric | null {
    return this.validityMetrics.find((validityMetric) => !validityMetric.pass) ?? null;
  }
}
