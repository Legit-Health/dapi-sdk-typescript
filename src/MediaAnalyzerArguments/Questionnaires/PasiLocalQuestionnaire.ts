import Questionnaire from './Questionnaire';

export default class PasiLocalQuestionnaire extends Questionnaire {
  constructor(
    public readonly surface: number,
    public readonly erythema: number,
    public readonly induration: number,
    public readonly desquamation: number
  ) {
    super();
    this.ensureIsInRange(surface, 0, 6, 'surface');
    this.ensureIsInRange(erythema, 0, 4, 'erythema');
    this.ensureIsInRange(induration, 0, 4, 'induration');
    this.ensureIsInRange(desquamation, 0, 4, 'desquamation');
  }

  public getName(): string {
    return 'PASI_LOCAL';
  }

  public asObject(): Record<string, any> {
    return {
      surface: this.surface,
      erythema: this.erythema,
      induration: this.induration,
      desquamation: this.desquamation
    };
  }
}
