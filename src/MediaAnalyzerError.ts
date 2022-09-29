export default class MediaAnalyzerError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
  }
}
