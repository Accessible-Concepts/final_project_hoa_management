export default class CommentModel {
  constructor(parseComment) {
    this.id = parseComment.id;
    this.createdBy = parseComment.get("createdBy");
    this.createdAt = parseComment.get("createdAt");
    this.text = parseComment.get("text");
    this.comments = parseComment.get("comments");
  }
}
