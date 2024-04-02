import { Injectable } from '@angular/core'
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database'
import { AngularFireStorage } from '@angular/fire/compat/storage'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private basePath = '/uploads'

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
  ) {}

  publishFileToStorage(file: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const storage = getStorage()
      const metadata = {
        contentType: file.file.type.toString(),
      }
      const storageRef = ref(storage, 'images/' + file.file.name)
      const uploadTask = uploadBytesResumable(storageRef, file.file, metadata)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // You can emit progress if needed
        },
        (error: any) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL: string) => {
              resolve(downloadURL)
            })
            .catch((error) => {
              reject(error)
            })
        },
      )
    })
  }

  getFiles(numberItems: number): AngularFireList<any> {
    return this.db.list(this.basePath, (ref) => ref.limitToLast(numberItems))
  }

  deleteFile(fileUpload: any): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name)
      })
      .catch((error) => console.log(error))
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key)
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath)
    storageRef.child(name).delete()
  }
}
