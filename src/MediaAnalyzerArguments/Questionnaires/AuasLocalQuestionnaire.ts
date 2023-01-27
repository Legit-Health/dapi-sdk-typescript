import Questionnaire from './Questionnaire';

type AuasLocalQuestionnaireObject = {
  itchiness: number;
}

export default class AuasLocalQuestionnaire extends Questionnaire {
  constructor(public readonly itchiness: number) {
    super();
    this.ensureIsInRange(itchiness, 0, 3, 'itchiness');
  }

  public getName(): string {
    return 'AUAS_LOCAL';
  }

  public asObject(): AuasLocalQuestionnaireObject {
    return {
      itchiness: this.itchiness
    };
  }
}
