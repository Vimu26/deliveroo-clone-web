import { Injectable } from '@angular/core'
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database'
import { AngularFireStorage } from '@angular/fire/compat/storage'
import {
  deleteObject,
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

  deleteFile(downloadUrl: string): Promise<void> {
    const storage = getStorage()
    // Get the reference to the file using its download URL
    const storageRef = ref(storage, downloadUrl)

    // Delete the file
    return deleteObject(storageRef)
  }
}
