export default class UserModel {
  constructor(parseUser) {
    this.id = parseUser.id;
    this.email = parseUser.get("email2");
    this.password = parseUser.get("password");
    this.fName = parseUser.get("fName");
    this.lName = parseUser.get("lName");
    this.phoneNumber = parseUser.get("phoneNumber");
    this.isCommitteeMember = parseUser.get("isCommitteeMember");
    this.community = parseUser.get("community");
    this.apartment = parseUser.get("apartment");
    this.parseUser = parseUser;
  }
}
