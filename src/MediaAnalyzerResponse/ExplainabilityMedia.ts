/* eslint-disable @typescript-eslint/no-explicit-any */
import {Detection} from './Detection';
import ExplainabilityMediaMetrics from './ExplainabilityMediaMetrics';

export default class ExplainabilityMedia {
  constructor(
    public readonly content: string | null,
    public readonly detections: Detection[] | null,
    public readonly metrics: ExplainabilityMediaMetrics
  ) {}

  static fromJson(json: any): ExplainabilityMedia {
    if (json === null) {
      return new ExplainabilityMedia(null, null, new ExplainabilityMediaMetrics(null));
    }
    const content = json['content'] ?? null;
    const detections = json['detections'] ?? null;
    return new ExplainabilityMedia(
      content === null || content === '' ? null : content,
      detections === null
        ? null
        : detections.map((detectionJson: any) => Detection.fromJson(detectionJson)),
      new ExplainabilityMediaMetrics(json.metrics?.px2cm ?? null)
    );
  }
}
