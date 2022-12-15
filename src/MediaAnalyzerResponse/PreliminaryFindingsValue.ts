export default class PreliminaryFindingsValue {
  constructor(
    readonly hasConditionSuspicion: number,
    readonly isPreMalignantSuspicion: number,
    readonly isMalignantSuspicion: number | null,
    readonly needsBiopsySuspicion: number,
    readonly needsSpecialistsAttention: number
  ) {}
}
