import DetectionLabel from './DetectionLabel';
import Point2d from './ScoringSystem/Point2d';

export class Detection {
  constructor(
    public readonly confidence: number,
    public readonly detectionLabel: DetectionLabel,
    public readonly p1: Point2d,
    public readonly p2: Point2d
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static fromJson(json: Record<string, any>): Detection {
    return new Detection(
      json['confidence'],
      json['label'],
      new Point2d(json['p1']['x'], json['p1']['y']),
      new Point2d(json['p2']['x'], json['p2']['y'])
    );
  }
}
