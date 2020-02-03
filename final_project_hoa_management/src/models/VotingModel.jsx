export default class VotingModel {
  constructor(parseVoting) {
    this.id = parseVoting.id;
    this.title = parseVoting.get("title");
    this.details = parseVoting.get("details");
    this.options = parseVoting.get("options");
    this.dueDate = parseVoting.get("dueDate");
    this.createdBy = parseVoting.get("createdBy");
  }
}
