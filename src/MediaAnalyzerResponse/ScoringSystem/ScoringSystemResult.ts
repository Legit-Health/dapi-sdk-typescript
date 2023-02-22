import ExplainabilityMedia from './ExplainabilityMedia';
import FacetScore from './FacetScore';
import ScoringSystemScore from './ScoringSystemScore';

export default class ScoringSystemResult {
  constructor(
    public readonly scoringSystemCode: string,
    public readonly score: ScoringSystemScore,
    public readonly facetScores: {[key: string]: FacetScore},
    public readonly explainabilityMedia: ExplainabilityMedia
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJson(scoringSystemCode: string, json: any): ScoringSystemResult {
    const scoringSystemScore = new ScoringSystemScore(json.grade.category, json.grade.score);

    const facetScores: {[key: string]: FacetScore} = {};
    for (const facetCode of Object.keys(json.facets)) {
      const scoreJson = json.facets[facetCode];
      facetScores[facetCode] = new FacetScore(facetCode, scoreJson.value, scoreJson.intensity);
    }

    return new ScoringSystemResult(
      scoringSystemCode,
      scoringSystemScore,
      facetScores,
      ExplainabilityMedia.fromJson(json.explainabilityMedia ?? null)
    );
  }

  getScore(): ScoringSystemScore {
    return this.score;
  }

  getFacetScore(facetCode: string): FacetScore {
    return this.facetScores[facetCode];
  }

  getFacetScores(): FacetScore[] {
    return Object.values(this.facetScores);
  }
}
