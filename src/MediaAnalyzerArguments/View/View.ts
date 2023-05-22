export type ViewValue =
  | 'Vertex projection'
  | 'Left true lateral'
  | 'Anterior projection'
  | 'Right true lateral';

export default class View {
  value: ViewValue;

  constructor(value: ViewValue) {
    this.value = value;
  }

  getCode(): string {
    switch (this.value) {
      case 'Vertex projection':
        return '260461000';
      case 'Left true lateral':
        return '260432001';
      case 'Anterior projection':
        return '272460009';
      case 'Right true lateral':
        return '260436003';
      default:
        return '';
    }
  }

  asObject() {
    return {
      code: this.getCode(),
      display: this.value,
      system: 'http://snomed.info/sct'
    };
  }
}
