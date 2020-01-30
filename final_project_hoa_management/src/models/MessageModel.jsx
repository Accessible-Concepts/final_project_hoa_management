export default class MessageModel {
  constructor(parseMessage) {
    this.id = parseMessage.id;
    this.title = parseMessage.get("title");
    this.details = parseMessage.get("details");
    this.priority = parseMessage.get("priority");
    this.selectedOption = parseMessage.get("selectedOption");
    this.img = parseMessage.get("image")._url;
    this.comments = parseMessage.get("comments");
    this.createdBy = parseMessage.get("createdBy");
    this.createdAt = parseMessage.get("createdAt");
    this.readByUser = parseMessage.get("readByUser");
    this.parseMessage = parseMessage;
  }
}
