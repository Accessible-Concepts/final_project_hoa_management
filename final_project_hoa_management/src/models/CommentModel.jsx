export default class CommentModel {
    constructor(comment) {
        this.createdBy = comment.createdBy;
        this.CreatedAt = comment.CreatedAt;
        this.text = comment.text;
        this.comments = comment.comments;
    }
}


