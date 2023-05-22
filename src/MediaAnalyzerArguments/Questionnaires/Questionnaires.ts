import Questionnaire from './Questionnaire';

export default class Questionnaires {
  constructor(public readonly questionnaires: Questionnaire[]) {}

  asObject(): Record<string, Record<string, number>> {
    return this.questionnaires.reduce(
      (acc, questionaire) => ({
        ...acc,
        [questionaire.getName()]: questionaire.asObject()
      }),
      {}
    );
  }
}
