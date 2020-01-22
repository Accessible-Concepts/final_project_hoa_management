export default class VoteModel {
  constructor(vote) {
    this.votedBy = vote.votedBy;
    this.vote = vote.vote;
  }
}
