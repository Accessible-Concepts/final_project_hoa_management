export default class UserModel {
  constructor(parseUser) {
    this.id = parseUser.id;
    this.email = parseUser.get("email");
    this.password = parseUser.get("password");
    this.fname = parseUser.get("fName");
    this.lname = parseUser.get("lName");
    this.apartment = parseUser.get("apartment");
    this.isCommitteeMember = parseUser.get("isCommitteeMember");
  }
}

// export default class UserModel {
//   constructor(user) {
//     this.name = user.name;
//     this.email = user.email;
//     this.apartment = user.apartment;
//     this.isCommitteeMember = user.isCommitteeMember;
//   }
// }
