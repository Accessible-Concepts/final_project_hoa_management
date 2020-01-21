// export default class NewUserModel {
//   constructor(parseModel) {
//     this.id = parseModel.id;
//     this.email = parseModel.get("email");
//     this.password = parseModel.get("password");
//     this.fname = parseModel.get("fname");
//     this.lname = parseModel.get("lname");
//     this.apartment = parseModel.get("apartment");
//     this.isCommitteeMember = parseModel.get("isCommitteeMember");
//   }
// }

export default class UserModel {
  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.apartment = user.apartment;
    this.isCommitteeMember = user.isCommitteeMember;
  }
}
