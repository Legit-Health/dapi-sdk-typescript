import Questionnaire from './Questionnaire';

export default class DlqiQuestionnaire extends Questionnaire {
  constructor(
    public readonly question1: number,
    public readonly question2: number,
    public readonly question3: number,
    public readonly question4: number,
    public readonly question5: number,
    public readonly question6: number,
    public readonly question7: number,
    public readonly question8: number,
    public readonly question9: number,
    public readonly question10: number
  ) {
    super();
    this.ensureIsInRange(question1, 0, 3, 'question1');
    this.ensureIsInRange(question2, 0, 3, 'question2');
    this.ensureIsInRange(question3, 0, 3, 'question3');
    this.ensureIsInRange(question4, 0, 3, 'question4');
    this.ensureIsInRange(question5, 0, 3, 'question5');
    this.ensureIsInRange(question6, 0, 3, 'question6');
    this.ensureIsInRange(question7, 0, 3, 'question7');
    this.ensureIsInRange(question8, 0, 3, 'question8');
    this.ensureIsInRange(question9, 0, 3, 'question9');
    this.ensureIsInRange(question10, 0, 3, 'question10');
  }

  public getName(): string {
    return 'DLQI';
  }

  public asObject() {
    return {
      question1: this.question1,
      question2: this.question2,
      question3: this.question3,
      question4: this.question4,
      question5: this.question5,
      question6: this.question6,
      question7: this.question7,
      question8: this.question8,
      question9: this.question9,
      question10: this.question10
    };
  }
}
