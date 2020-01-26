const user = new Parse.User();
user.set("username", "A string");
user.set("email", "A string");
user.set("phoneNumber", "A string");
user.set("lName", "A string");
user.set("fName", "A string");
user.set("isCommeetteeMember", true);
user.set("address1", "A string");
user.set("address2", "A string");
user.set("city", "A string");
user.set("state", "A string");
user.set("zip", 1);
user.set("country", "A string");
user.set("password", "#Password123");

user
  .signUp()
  .then(user => {
    if (typeof document !== "undefined")
      document.write(`User signed up: ${JSON.stringify(user)}`);
    console.log("User signed up", user);
  })
  .catch(error => {
    if (typeof document !== "undefined")
      document.write(`Error while signing up user: ${JSON.stringify(error)}`);
    console.error("Error while signing up user", error);
  });
