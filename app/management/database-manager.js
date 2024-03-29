import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
// import { updateMetadata, getMetadata } from "@react-native-firebase/storage";

import { Platform } from "react-native";
import { matrixTransform } from "react-native-svg/lib/typescript/elements/Shape";

const noteTitle = "Custom Note Title";
const lookTitle = "Custom Image Title";
const listenTitle = "Custom Audio Title";

class DatabaseManager {
  constructor() {
    this.db = database();
    this.storage = storage();
  }
  logOutCurrentUser() {
    auth().signOut();
  }
  async removeCurrentCreatorAccount() {
    const user = auth().currentUser;
    const uid = user.uid;
    const code = await this.getCode();
    this.db.ref(`content/${code}`).remove();
    this.db.ref(`users/${uid}`).remove();
    auth().signOut();
    return user.delete();
  }

  // MARK: -  Content functions
  async updateTitle(contentType, directory, newTitle) {
    const code = await this.getCode();
    this.db
      .ref(`content/${code}/${contentType}/${directory}/title`)
      .set(newTitle);
  }
  async getNotesContent() {
    const code = await this.getCode();
    const items = (
      await this.db.ref(`content/${code}/notesContent`).once("value")
    ).val();

    let data = [];
    Object.entries(items).forEach((item, index) => {
      const title = item[1].title;
      const content = item[1].content;
      const bucket = item[0];

      data.push({
        number: 1 + index,
        bucket: bucket,
        title: title,
        description: content,
        content: content,
        completed:
          content != null && content != "" && title.trim() != noteTitle
            ? true
            : false,
      });
    });
    return data;
  }
  async updateNotesContent(root, title, content) {
    const code = await this.getCode();
    this.db.ref(`content/${code}/notesContent/${root}`).set({
      title: title,
      content: content,
    });
  }
  async getLookContent() {
    let data = [];
    const code = await this.getCode();
    const items = (
      await this.db.ref(`content/${code}/lookContent`).once("value")
    ).val();
    const length = Object.entries(items).length;

    for (let i = 0; i < length; i++) {
      let imageURL;

      const item = Object.entries(items)[i];
      const title = item[1].title;
      const imageName = item[1].content;
      const bucket = item[0];
      const ref = this.storage.ref(`${code}/lookContent/${imageName}`);

      await ref
        .getDownloadURL()
        .then((url) => {
          imageURL = url;
        })
        .catch(() => {
          imageURL = null;
        });

      data.push({
        number: 1 + i,
        bucket: bucket,
        title: title,
        description: imageName,
        content: imageURL,
        completed:
          imageName != null && imageName != "" && title.trim() != lookTitle
            ? true
            : false,
      });
    }
    return data;
  }
  async updateLookImage(directory, imageName, imagePath) {
    //This func deletes and adds/changes image
    const code = await this.getCode();
    let oldImageName = (
      await this.db
        .ref(`content/${code}/lookContent/${directory}/content`)
        .once("value")
    ).val();

    //Update db
    this.db
      .ref(`content/${code}/lookContent/${directory}/content`)
      .set(imageName);

    //UpdateStorage
    this.deleteStorageItem(oldImageName);
    //Only add image to storage if we are changing/adding image not deleting
    if (imagePath != null) {
      const successUpload = await this.uploadToStorage(
        "lookContent",
        imagePath,
        imageName
      );
      return successUpload;
    }
    return true;
  }
  async getListenContent() {
    let data = [];
    const code = await this.getCode();
    const items = (
      await this.db.ref(`content/${code}/listenContent`).once("value")
    ).val();
    const length = Object.entries(items).length;

    for (let i = 0; i < length; i++) {
      let audioURI;
      let length;

      const item = Object.entries(items)[i];
      const title = item[1].title;
      const audioName = item[1].content;
      const bucket = item[0];
      const ref = this.storage.ref(`${code}/listenContent/${audioName}`);

      await ref
        .getDownloadURL()
        .then((url) => {
          audioURI = url;  
        })
        .catch(() => {
          audioURI = null;
        });
        if(audioURI != null){
          await ref.getMetadata().then((meta) => {
            length = meta 
          })
        }
      data.push({
        number: 1 + i,
        bucket: bucket,
        title: title,
        description: audioName,
        content: [audioURI, length],
        completed:
          audioName != null && audioName != "" && title.trim() != listenTitle
            ? true
            : false,
      });
    }
    return data;
  }
  async updateListenContent(directory, name, filePath, audioLength) {
    //This func deletes and adds/changes image
    const code = await this.getCode();
    let oldFileName = (
      await this.db
        .ref(`content/${code}/listenContent/${directory}/content`)
        .once("value")
    ).val();

     //Update db
     this.db
     .ref(`content/${code}/listenContent/${directory}/content`)
     .set(name);

    //UpdateStorage
    this.deleteStorageItem("listenContent", oldFileName);
    //Only add image to storage if we are changing/adding image not deleting
    if (filePath != null) {
      const successUpload = await this.uploadToStorage(
        "listenContent",
        filePath,
        name,
        {customMetadata: {length:String(audioLength)}}
        )
      return successUpload
    }
    return true;
  }

  // MARK: - Get info functions
  async getPaid() {
    const UID = auth().currentUser.uid;
    const paid = await this.db.ref(`users/${UID}/paid`).once("value");
    return paid.val();
  }
  async getCodeIfPaid() {
    const UID = auth().currentUser.uid;
    const paid = (await this.db.ref(`users/${UID}/paid`).once("value")).val();
    if (paid == true) {
      const code = (await this.db.ref(`users/${UID}/code`).once("value")).val();
      return code;
    }
  }
  async getCode() {
    const UID = auth().currentUser.uid;
    const snapshot = await this.db.ref(`users/${UID}/code`).once("value");
    return snapshot.val();
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
  async getOccasion() {
    const UID = auth().currentUser.uid;
    const code = (await this.db.ref(`users/${UID}/code`).once("value")).val();
    const occasion = (
      await this.db.ref(`content/${code}/occasion`).once("value")
    ).val();
    return occasion;
  }
  async getTemplate(contentType, number) {
    const templates = (
      await this.db.ref(`templates/${contentType}`).once("value")
    ).val();
    let data;
    Object.entries(templates).forEach(([key, value], index) => {
      if (index == number - 1) {
        data = { title: key, content: value };
      }
    });
    return data;
  }

  //MARK: - Setting/Updatintg functions
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
          item1: { title: noteTitle, content: "" },
          item2: { title: noteTitle, content: "" },
          item3: { title: noteTitle, content: "" },
          item4: { title: noteTitle, content: "" },
          item5: { title: noteTitle, content: "" },
        },
        lookContent: {
          item1: { title: lookTitle, content: "" },
          item2: { title: lookTitle, content: "" },
          item3: { title: lookTitle, content: "" },
          item4: { title: lookTitle, content: "" },
          item5: { title: lookTitle, content: "" },
        },
        listenContent: {
          item1: { title: listenTitle, content: "" },
          item2: { title: listenTitle, content: "" },
          item3: { title: listenTitle, content: "" },
          item4: { title: listenTitle, content: "" },
          item5: { title: listenTitle, content: "" },
        },
        partnerName: "",
        occasion: "Happy anniversary",
      });
    });
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

  //MARK: - Misc Functions
  async isCreatorAccount(UID) {
    const snapshot = await this.db.ref(`users/${UID}/creator`).once("value");
    return snapshot.val();
  }
  async codeExists(code) {
    const snapshot = await this.db.ref(`content/${code}`).once("value");
    return snapshot.exists();
  }
  generateSecureCode() {
    return Math.random().toString(36).slice(2, 8);
  }
  getPlatformPath(path, uri) {
    return Platform.select({
      android: { path },
      ios: { uri },
    });
  }

  //MARK: Storage Functions
  async deleteStorageItem(contentType, name) {
    const code = await this.getCode();
    const exists = await this.checkStorageForItem(contentType, name);

    if (exists == true) {
      this.storage.ref(`${code}/${contentType}/${name}`).delete();
    }
  }
  async checkStorageForItem(contentType, title) {
    let exists = false;
    const code = await this.getCode();

    await this.storage
      .ref(`${code}/${contentType}`)
      .listAll()
      .then((result) => {
        if (result != null) {
          result.items.forEach((itemRef) => {
            const url = itemRef.toString();
            const fileName = this.storage.refFromURL(url).name;
            if (fileName == title) {
              exists = true;
            }
          });
        }
      });
    return exists;
  }
  async uploadToStorage(contentType, path, name, metadata = null) {
    let success;
    const code = await this.getCode();

    const ref = this.storage.ref(`${code}/${contentType}/${name}`);
    const task = ref.putFile(path, metadata);
    await task
      .then(() => {
        success = true;
      })
      .catch(() => {
        success = false;
      });
    return success;
  }
}

const dbManager = new DatabaseManager();
export default dbManager;
