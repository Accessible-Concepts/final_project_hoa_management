export default class VotingModel {
  constructor(voting) {
    this.id = voting.id;
    // this.createdBy = userId;
    // this.createdBy = voting.createdBy;
    // this.createdAt = voting.createdAt;
    this.title = voting.title;
    this.details = voting.details;
    this.options = voting.options;
    this.dueDate = voting.dueDate;
    this.userId = voting.userId;
    // this.votes = voting.votes;
  }
}
