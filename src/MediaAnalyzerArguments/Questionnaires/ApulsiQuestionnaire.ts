import Questionnaire from './Questionnaire';

export default class ApulsiQuestionnaire extends Questionnaire {
  constructor(
    public readonly erythemaSurface: number,
    public readonly painApusa: number,
    public readonly odorApusa: number
  ) {
    super();
    this.ensureIsInRange(erythemaSurface, 0, 6, 'erythemaSurface');
    this.ensureIsInRange(painApusa, 0, 1, 'painApusa');
    this.ensureIsInRange(odorApusa, 0, 1, 'odorApusa');
  }

  public getName(): string {
    return 'APULSI';
  }

  public asObject() {
    return {
      erythemaSurface: this.erythemaSurface,
      painApusa: this.painApusa,
      odorApusa: this.odorApusa
    };
  }
}
