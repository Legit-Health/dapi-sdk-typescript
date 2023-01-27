import Questionnaire from './Questionnaire';

export default class ScoradLocalQuestionnaire extends Questionnaire {
  constructor(
    public readonly surfaceValue: number,
    public readonly erythema: number,
    public readonly swelling: number,
    public readonly crusting: number,
    public readonly excoriation: number,
    public readonly lichenification: number,
    public readonly dryness: number,
    public readonly itchinessScorad: number,
    public readonly sleeplessness: number
  ) {
    super();
    this.ensureIsInRange(surfaceValue, 0, 100, 'surfaceValue');
    this.ensureIsInRange(erythema, 0, 3, 'erythema');
    this.ensureIsInRange(swelling, 0, 3, 'swelling');
    this.ensureIsInRange(crusting, 0, 3, 'crusting');
    this.ensureIsInRange(excoriation, 0, 3, 'excoriation');
    this.ensureIsInRange(lichenification, 0, 3, 'lichenification');
    this.ensureIsInRange(dryness, 0, 3, 'dryness');
    this.ensureIsInRange(itchinessScorad, 0, 10, 'itchinessScorad');
    this.ensureIsInRange(sleeplessness, 0, 10, 'sleeplessness');
  }

  public getName(): string {
    return 'SCORAD_LOCAL';
  }

  public asObject(): Record<string, any> {
    return {
      surfaceValue: this.surfaceValue,
      itchinessScorad: this.itchinessScorad,
      sleeplessness: this.sleeplessness,
      erythema: this.erythema,
      swelling: this.swelling,
      crusting: this.crusting,
      excoriation: this.excoriation,
      lichenification: this.lichenification,
      dryness: this.dryness
    };
  }
}
