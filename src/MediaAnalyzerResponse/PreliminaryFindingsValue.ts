export default class PreliminaryFindingsValue {
  constructor(
    readonly hasConditionSuspicion: number,
    readonly isPreMalignantSuspicion: number,
    readonly needsBiopsySuspicion: number,
    readonly needsSpecialistsAttention: number
  ) {}
}
