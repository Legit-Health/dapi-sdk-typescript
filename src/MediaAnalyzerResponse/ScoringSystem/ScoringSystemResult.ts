import FacetScore from './FacetScore';
import ScoringSystemScore from './ScoringSystemScore';

interface Grade {
  score: number;
  category: string;
}

interface FacetValue {
  value: number;
  intensity: number | null;
}

interface Values {
  grade: Grade;
  facets: Record<string, FacetValue>;
}

export default class ScoringSystemResult {
  private score: ScoringSystemScore;
  private facetScores: Record<string, FacetScore>;

  constructor(readonly scoringSystemCode: string, values: Values) {
    this.score = new ScoringSystemScore(values.grade.category, values.grade.score);

    this.facetScores = Object.keys(values.facets).reduce(function (acc, facetCode) {
      const scoreJson = values.facets[facetCode];
      acc[facetCode] = new FacetScore(facetCode, scoreJson.value, scoreJson.intensity);
      return acc;
    }, {} as Record<string, FacetScore>);
  }

  getScore(): ScoringSystemScore {
    return this.score;
  }

  getFacetScore(facetCode: string): FacetScore {
    return this.facetScores[facetCode];
  }
}
