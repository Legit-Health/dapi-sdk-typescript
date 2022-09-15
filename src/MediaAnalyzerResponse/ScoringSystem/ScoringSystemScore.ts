export default class ScoringSystemScore {
  constructor(
    readonly category: string | null = null,
    readonly calculatedScore: number | null = null,
    readonly questionnaireScore: number | null = null
  ) {}
}
