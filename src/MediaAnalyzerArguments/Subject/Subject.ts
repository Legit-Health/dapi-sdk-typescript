import formatDate from 'date-fns/format';
import Company from './Company';
import Gender from './Gender';

export default class Subject {
  constructor(
    readonly id: string | null = null,
    readonly gender: Gender | null = null,
    readonly height: string | null = null,
    readonly weight: string | null = null,
    readonly birthdate: Date | null = null,
    readonly practitionerId: string | null = null,
    readonly company: Company | null = null
  ) {}

  asObject() {
    return {
      identifier: this.id,
      gender: this.gender,
      height: this.height ? parseFloat(this.height) : null,
      weight: this.weight ? parseFloat(this.weight) : null,
      birthdate: this.birthdate ? formatDate(this.birthdate, 'yyyy-MM-dd') : null,
      generalPractitioner: {
        identifier: this.practitionerId
      },
      managingOrganization: {
        identifier: this.company?.id,
        display: this.company?.name
      }
    };
  }
}
