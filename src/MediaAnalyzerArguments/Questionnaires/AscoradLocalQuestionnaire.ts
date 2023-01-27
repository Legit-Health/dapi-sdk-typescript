import Questionnaire from './Questionnaire';

export default class AscoradLocalQuestionnaire extends Questionnaire {
  constructor(
    public readonly surfaceValue: number,
    public readonly itchinessScorad: number,
    public readonly sleeplessness: number
  ) {
    super();
    this.ensureIsInRange(surfaceValue, 0, 100, 'surfaceValue');
    this.ensureIsInRange(itchinessScorad, 0, 10, 'itchinessScorad');
    this.ensureIsInRange(sleeplessness, 0, 10, 'sleeplessness');
  }

  public getName(): string {
    return 'ASCORAD_LOCAL';
  }

  public asObject() {
    return {
      itchinessScorad: this.itchinessScorad,
      surfaceValue: this.surfaceValue,
      sleeplessness: this.sleeplessness
    };
  }
}
