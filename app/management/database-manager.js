import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage"
import { Platform } from 'react-native'

class DatabaseManager {
  constructor() {
    this.db = database();
  }

  async isCreatorAccount() {
    const UID = auth().currentUser.uid;
    const snapshot = await this.db.ref(`users/${UID}/creator`).once("value");
    return snapshot.val();
  }

  async codeExists(code) {
    const snapshot = await this.db.ref(`content/${code}`).once("value");
    return snapshot.exists();
  }

  async getCode() {
    const UID = auth().currentUser.uid;
    const snapshot = await this.db.ref(`users/${UID}/code`).once("value");
    return snapshot.val();
  }
  createNewUserAccount(email, code) {
    const UID = auth().currentUser.uid;
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

  createNewCreatorAccount(name, email) {
    const UID = auth().currentUser.uid;
    const code = this.generateSecureCode();
    //Recursively checks if code has been used and keeps generating new code
    this.codeExists(code).then((codeExists) => {
      if (codeExists) {
        return this.createNewCreatorAccount(name, email);
      }
      //creates new user
      this.db.ref(`users/${UID}`).set({
        name: name,
        email: email,
        creator: true,
        paid: false,
        upgraded: false,
        published: false,
        code: code,
      });

      //creates new content directory
      this.db.ref(`content/${code}`).set({
        notesContent: {
          "Item Custom Title": "",
          "Item Custom Title ": "",
          "Item Custom Title  ": "",
          "Item Custom Title   ": "",
          "Item Custom Title    ": "",
        },
        listenContent: {
          "Item Custom Title": "",
          "Item Custom Title ": "",
          "Item Custom Title  ": "",
          "Item Custom Title   ": "",
          "Item Custom Title    ": "",
        },
        lookContent: {
          "Item Custom Title": "",
          "Item Custom Title ": "",
          "Item Custom Title  ": "",
          "Item Custom Title   ": "",
          "Item Custom Title    ": "",
        },
        partnerName: "",
        occasion: "Welcome",
      });
    });
  }

  deleteUser(user) {
    user.delete();
  }

  async getCreatorName() {
    const UID = auth().currentUser.uid;
    const snapshot = await this.db.ref(`users/${UID}/name`).once("value");
    return snapshot.val();
  }

  async getPartnerName() {
    const UID = auth().currentUser.uid;
    const code = (await this.db.ref(`users/${UID}/code`).once("value")).val();
    const name = (
      await this.db.ref(`content/${code}/partnerName`).once("value")
    ).val();
    return name;
  }

  async getContent(contentType) {
    //contentType options: listenContent, lookContent, notesContent
    const UID = auth().currentUser.uid;
    const code = (await this.db.ref(`users/${UID}/code`).once("value")).val();
    const items = (
      await this.db.ref(`content/${code}/${contentType}`).once("value")
    ).val();
    let data = [];
    Object.entries(items).forEach(([key, value], index) => {
      data.push({
        number: 1 + index,
        title: key,
        content: value.trim(),
        completed: value == "" ? false : true,
      });
    });
    return data;
  }

  async getOccasion() {
    const UID = auth().currentUser.uid;
    const code = (await this.db.ref(`users/${UID}/code`).once("value")).val();
    const occasion = (
      await this.db.ref(`content/${code}/occasion`).once("value")
    ).val();
    return occasion;
  }

  async getTemplate(contentType, number){
    const templates = (await this.db.ref(`templates/${contentType}`).once("value")).val()
    let data;
    Object.entries(templates).forEach(([key, value], index) => {
      if(index == number-1){
        data = {title: key, content: value}
      }
    });
    return data
    
  }
  async updateContent(contentType, oldTitle, newTitle, content) {
    const UID = auth().currentUser.uid;
    const code = (await this.db.ref(`users/${UID}/code`).once("value")).val();
    const titleAlreadyExists = (
      await this.db
        .ref(`content/${code}/${contentType}/${newTitle}`)
        .once("value")
    ).exists();
    if(newTitle.length > 21){
      return true
    }
    if (titleAlreadyExists == false) {
      this.db.ref(`content/${code}/${contentType}/${oldTitle}`).set(null);
      this.db
        .ref(`content/${code}/${contentType}/${newTitle}`)
        .set(content);
      return false
    }

    if(newTitle == oldTitle){
      this.db.ref(`content/${code}/${contentType}/${newTitle}`)
      .set(content);
      return false
    }

    return true
  }

  setOccasion(occasion) {
    this.getCode().then((code) => {
      this.db.ref(`content/${code}/occasion`).set(occasion);
    });
  }

  setPartnerName(name) {
    this.getCode().then((code) => {
      this.db.ref(`content/${code}/partnerName`).set(name);
    });
  }

  generateSecureCode() {
    return Math.random().toString(36).slice(2, 8);
  }

  //Storage
  getPlatformPath(path, uri){
    return Platform.select({
      android:{path},
      ios:{uri}
    })
  }
  async uploadImageToStorage(path, imageName){
    const ref = storage().ref(imageName)
    const task = await ref.putFile(path)
    task.then(()=> {
      console.log("Image uploaded")
    }).catch((error) => {
      console.log("error uploading")
    })
  }
}

const dbManager = new DatabaseManager();
export default dbManager;
