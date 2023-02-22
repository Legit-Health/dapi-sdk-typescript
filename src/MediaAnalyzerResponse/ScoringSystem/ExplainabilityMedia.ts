/* eslint-disable @typescript-eslint/no-explicit-any */
import {Detection} from './Detection';

export default class ExplainabilityMedia {
  content: string | null;
  detections: Detection[] | null;

  constructor(content: string | null, detections: Detection[] | null) {
    this.content = content;
    this.detections = detections;
  }

  static fromJson(json: any): ExplainabilityMedia {
    if (json === null) {
      return new ExplainabilityMedia(null, null);
    }
    const content = json['content'] ?? null;
    const detections = json['detections'] ?? null;
    return new ExplainabilityMedia(
      content === null || content === '' ? null : content,
      detections === null
        ? null
        : detections.map((detectionJson: any) => Detection.fromJson(detectionJson))
    );
  }
}
