import ScoringSystemFacetCalculatedValue from './ScoringSystemFacetCalculatedValue';
import ScoringSystemScore from './ScoringSystemScore';

interface Grade {
  float: string | null;
  category: string | null;
}

interface FacetValue {
  value: string;
  baseN: string;
}

interface Values {
  grade: null | Grade;
  questionnaire: number | null;
  facets: Record<string, FacetValue>;
}

export default class ScoringSystemValues {
  private score: ScoringSystemScore;

  constructor(readonly scoringSystemCode: string, private values: Values) {
    const calculatedValue = this.values.grade?.float ?? null;
    this.score = new ScoringSystemScore(
      this.values.grade?.category ?? null,
      calculatedValue === null ? null : parseFloat(calculatedValue),
      this.values.questionnaire
    );
  }

  getScore(): ScoringSystemScore {
    return this.score;
  }

  getFacetCalculatedValue(facetCode: string): ScoringSystemFacetCalculatedValue {
    const calculatedValue = this.values.facets[facetCode]?.value ?? null;
    return new ScoringSystemFacetCalculatedValue(
      this.values.facets[facetCode]?.baseN ?? null,
      Number.isNaN(calculatedValue) ? null : parseFloat(calculatedValue)
    );
  }
}
