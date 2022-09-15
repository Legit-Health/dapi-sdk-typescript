import Questionnaire from './Questionnaire';

export default class AscoradLocalQuestionnaire extends Questionnaire {
  constructor(
    public readonly surface_value: number,
    public readonly itchiness_scorad: number,
    public readonly sleeplessness: number
  ) {
    super();
    this.ensureIsInRange(surface_value, 0, 100, 'surface_value');
    this.ensureIsInRange(itchiness_scorad, 0, 10, 'itchiness_scorad');
    this.ensureIsInRange(sleeplessness, 0, 10, 'sleeplessness');
  }

  public getName(): string {
    return 'ASCORAD_LOCAL';
  }

  public asObject(): Record<string, any> {
    return {
      itchiness_scorad: this.itchiness_scorad,
      surface_value: this.surface_value,
      sleeplessness: this.sleeplessness
    };
  }
}
