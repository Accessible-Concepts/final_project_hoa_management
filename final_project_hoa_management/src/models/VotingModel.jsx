export default class VotingModel {
  constructor(parseVoting) {
    this.id = parseVoting.id;
    this.title = parseVoting.get("title");
    this.details = parseVoting.get("details");
    this.options = parseVoting.get("options");
    this.dueDate = parseVoting.get("dueDate");
    this.createdBy = parseVoting.get("createdBy");
    this.createdAt = parseVoting.get("createdAt");
    this.community = parseVoting.get("community");
    this.isActive = parseVoting.get("isActive");
    this.votedByUser = parseVoting.get("votedByUser");
    this.readByUser = parseVoting.get("readByUser");
    this.parseVoting = parseVoting;
  }
}
