export default class MessageModel {
  constructor(parseMessage) {
    this.id = parseMessage.id;
    this.title = parseMessage.get("title");
    this.details = parseMessage.get("details");
    this.priority = parseMessage.get("priority");
    this.img = parseMessage.get("image")._url;
    this.comments = parseMessage.get("comments");
    this.createdBy = parseMessage.get("createdBy");
  }
}
