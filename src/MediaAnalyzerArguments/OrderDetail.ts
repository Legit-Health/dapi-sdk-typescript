export default class OrderDetail {
  constructor(readonly faceDetection = false) {}

  asObject(): object {
    return {
      faceDetection: this.faceDetection
    };
  }
}
