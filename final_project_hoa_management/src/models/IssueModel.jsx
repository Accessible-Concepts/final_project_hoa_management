export default class IssueModel {
  constructor(parseIssue) {
    this.id = parseIssue.id;
    this.title = parseIssue.get("title");
    this.details = parseIssue.get("details");
    this.priority = parseIssue.get("priority");
    this.selectedOption = parseIssue.get("selectedOption");
    this.img = parseIssue.get("image")._url;
    this.comments = parseIssue.get("comments");
    this.createdBy = parseIssue.get("createdBy");
    this.createdAt = parseIssue.get("createdAt");
    this.readByUser = parseIssue.get("readByUser");
    this.community = parseIssue.get("community");
    this.parseIssue = parseIssue;
  }
}
