import Questionnaire from './Questionnaire';

export default class SevenPCQuestionnaire extends Questionnaire {
  constructor(
    public readonly question1SevenPC: number,
    public readonly question2SevenPC: number,
    public readonly question3SevenPC: number,
    public readonly question4SevenPC: number,
    public readonly question5SevenPC: number,
    public readonly question6SevenPC: number,
    public readonly question7SevenPC: number
  ) {
    super();

    this.ensureIsInRange(question1SevenPC, 0, 1, 'question1SevenPC');
    this.ensureIsInRange(question2SevenPC, 0, 1, 'question2SevenPC');
    this.ensureIsInRange(question3SevenPC, 0, 1, 'question3SevenPC');
    this.ensureIsInRange(question4SevenPC, 0, 1, 'question4SevenPC');
    this.ensureIsInRange(question5SevenPC, 0, 1, 'question5SevenPC');
    this.ensureIsInRange(question6SevenPC, 0, 1, 'question6SevenPC');
    this.ensureIsInRange(question7SevenPC, 0, 1, 'question7SevenPC');
  }

  getName(): string {
    return '7PC';
  }

  asObject() {
    return {
      question1SevenPC: this.question1SevenPC,
      question2SevenPC: this.question2SevenPC,
      question3SevenPC: this.question3SevenPC,
      question4SevenPC: this.question4SevenPC,
      question5SevenPC: this.question5SevenPC,
      question6SevenPC: this.question6SevenPC,
      question7SevenPC: this.question7SevenPC
    };
  }
}
