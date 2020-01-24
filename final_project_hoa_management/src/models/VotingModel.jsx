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

// export default class VotingModel {
// constructor(voting) {
// this.id = voting.id;
// this.createdBy = userId;
// this.createdBy = voting.createdBy;
// this.createdAt = voting.createdAt;
// this.title = voting.title;
// this.details = voting.details;
// this.options = voting.options;
// this.dueDate = voting.dueDate;
// this.userId = voting.userId;
// this.votes = voting.votes;
// }
// }
