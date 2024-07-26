import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  FirebaseStorage,
  StorageReference,
  UploadTaskSnapshot,
} from "firebase/storage";
import { firebase } from "../configs/firebase.config";
initializeApp(firebase);
const storage: FirebaseStorage = getStorage();
export class UploadFiles {
  private model: string;
  private type: string;
  private file: Express.Multer.File | undefined;

  constructor(
    model: string,
    type: string,
    file: Express.Multer.File | undefined
  ) {
    this.model = model;
    this.type = type;
    this.file = file;
  }
  async uploadFileAndDownloadURL(): Promise<string | undefined> {
    if (this.file?.mimetype && this.file?.buffer) {
      const storageRef: StorageReference = ref(
        storage,
        `${this.model.toLowerCase()}/${this.type.toLowerCase()}/${Date.now()}`
      );
      const metadata = {
        contentType: this.file.mimetype,
      };

      const snapshot: UploadTaskSnapshot = await uploadBytesResumable(
        storageRef,
        this.file.buffer,
        metadata
      );

      const downloadURL: string = await getDownloadURL(snapshot.ref);
      return downloadURL;
    }
    return undefined;
  }
}
