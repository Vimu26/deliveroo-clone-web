import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Output() filesUploaded = new EventEmitter<File[]>();

  constructor() { }

  onFileChange(event: any) {
    const files = event.target.files;
    this.uploadFiles(files);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files) {
      this.uploadFiles(files);
    }
  }

  uploadFiles(files: FileList) {
    const uploadedFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (allowedTypes.includes(file.type)) {
        uploadedFiles.push(file);
      } else {
        alert('Please upload only JPG, JPEG, or PNG files.');
      }
    }
    this.filesUploaded.emit(uploadedFiles);
  }
}
