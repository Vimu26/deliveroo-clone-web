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
    console.log(file.file.type)
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
          console.log(snapshot)
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          // You can emit progress if needed
        },
        (error: any) => {
          console.error('Upload error:', error)
          reject(error)
        },
        () => {
          console.log(uploadTask.snapshot.ref)
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL: string) => {
              console.log('File available at', downloadURL.toString())
              resolve(downloadURL)
            })
            .catch((error) => {
              console.error('Error getting download URL:', error)
              reject(error)
            })
        },
      )
    })
  }
  private saveFileData(fileUpload: any): void {
    console.log(fileUpload)
    this.db.list(this.basePath).push(fileUpload)
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
