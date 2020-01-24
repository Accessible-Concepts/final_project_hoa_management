export default class UserModel {
  constructor(parseUser) {
    this.id = parseUser.id;
    this.email = parseUser.get("email");
    this.password = parseUser.get("password");
    this.fname = parseUser.get("fName");
    this.lname = parseUser.get("lName");
    this.address1 = parseUser.get("address1");
    this.address2 = parseUser.get("address2");
    this.city = parseUser.get("city");
    this.state = parseUser.get("state");
    this.zip = parseUser.get("zip");
    this.country = parseUser.get("country");
    this.phoneNumber = parseUser.get("phoneNumber");
    this.isCommitteeMember = parseUser.get("isCommitteeMember");
  }
}
