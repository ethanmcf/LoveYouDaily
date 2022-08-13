import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

class DatabaseManager {
  constructor() {
    this.db = database();
  }
  async isCreatorAccount(UID) {
    var isCreator = false;
    const snapshot = await this.db.ref(`users/${UID}/creator`).once("value");
    return snapshot.val();
  }

  async codeExists(code) {
    let codeExists = false;
    const snapshot = await this.db.ref(`content/${code}`).once("value");
    return snapshot.exists();
  }

  createNewUserAccount(email, code, UID) {
    this.db.ref(`users/${UID}`).set(
      {
        email: email,
        creator: false,
        code: code,
      },
      (error) => {
        if (error) {
          return error;
        }
      }
    );
  }

  createNewCreatorAccount(name, email, UID) {
    //generates secure code
    code = this.generateSecureCode();
    //Recursively checks if code has been used and keeps generating new code
    this.codeExists(code).then((codeExists) => {
      if (codeExists) {
        return this.createNewCreatorAccount(name, email, UID);
      }
      this.db.ref(`users/${UID}`).set(
        {
          name: name,
          email: email,
          creator: true,
          paid: false,
          upgraded: false,
          published: false,
          code: code,
        }
      );

      this.db.ref(`content/${code}`).set({
            parnterName: "",
            occasion: "Welcome"
      });
    });
  }

  deleteUser(user) {
    user.delete();
  }

  generateSecureCode() {
    return Math.random().toString(36).slice(2);
  }
}
export default DatabaseManager;
