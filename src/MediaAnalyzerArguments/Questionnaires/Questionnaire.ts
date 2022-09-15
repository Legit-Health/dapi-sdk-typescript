export default abstract class Questionnaire {
  abstract asObject(): Record<string, any>;
  abstract getName(): string;

  protected ensureIsInRange(value: number, min: number, max: number, name: string) {
    if (value >= min && value <= max) {
      return;
    }
    throw new Error(`${name} should be between ${min} and ${max}`);
  }
}
