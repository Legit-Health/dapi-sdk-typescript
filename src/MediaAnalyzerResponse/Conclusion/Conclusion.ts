import ConclusionCode from './ConclusionCode';

export default class Conclusion {
  readonly conclusionCode: ConclusionCode;

  constructor(
    readonly pathologyCode: string,
    readonly probability: number,
    code: string,
    codeSystem: string
  ) {
    this.conclusionCode = new ConclusionCode(code, codeSystem);
  }

  isPossible(): boolean {
    return this.probability > 0;
  }
}
