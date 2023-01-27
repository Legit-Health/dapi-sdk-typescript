import Questionnaire from './Questionnaire';

export default class ApasiLocalQuestionnaire extends Questionnaire {
  constructor(public readonly surface: number) {
    super();
    this.ensureIsInRange(surface, 0, 6, 'surface');
  }

  public getName(): string {
    return 'APASI_LOCAL';
  }

  public asObject() {
    return {
      surface: this.surface
    };
  }
}
