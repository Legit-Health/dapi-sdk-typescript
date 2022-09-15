import Questionnaire from './Questionnaire';

export default class ApulsiQuestionnaire extends Questionnaire {
  constructor(
    public readonly erythema_surface: number,
    public readonly pain_apusa: number,
    public readonly odor_apusa: number
  ) {
    super();
    this.ensureIsInRange(erythema_surface, 0, 6, 'erythema_surface');
    this.ensureIsInRange(pain_apusa, 0, 1, 'pain_apusa');
    this.ensureIsInRange(odor_apusa, 0, 1, 'odor_apusa');
  }

  public getName(): string {
    return 'APULSI';
  }

  public asObject(): Record<string, any> {
    return {
      erythema_surface: this.erythema_surface,
      pain_apusa: this.pain_apusa,
      odor_apusa: this.odor_apusa
    };
  }
}
