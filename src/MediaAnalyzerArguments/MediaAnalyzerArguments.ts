import MediaAnalyzerData from './MediaAnalyzerData';
import OrderDetail from './OrderDetail';

export default class MediaAnalyzerArguments {
  constructor(
    public readonly requestId: string,
    public readonly data: MediaAnalyzerData,
    public readonly orderDetail: OrderDetail = new OrderDetail()
  ) {}

  asObject() {
    return {
      requestId: this.requestId,
      data: this.data.asObject(),
      orderDetail: this.orderDetail.asObject()
    };
  }
}
