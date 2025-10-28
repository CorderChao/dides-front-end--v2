import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-attachments',
  templateUrl: './view-attachments.component.html',
  styleUrl: './view-attachments.component.scss'
})
export class ViewAttachmentsComponent implements OnInit {
  @Input() src;
  @Input() type: string;
  base64;
  title: string;
  fileType:string;

  constructor(public dialogRef: MatDialogRef<ViewAttachmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}



  ngOnInit(): void {
    this.title = this.data.name || 'FILE';
    this.fileType = this.data.format;

    // console.log('Received data:', this.data);

    if (this.data.file) {
      if (this.fileType === 'pdf') {
        this.base64 = this.b64toBlob(this.data.file, 'pdf');
      } else if (this.fileType === 'image') {
        this.base64 = `data:image/jpeg;base64,${this.data.file}`;
      }
    } else {
      console.error('No file data received');
    }
  }


  b64toBlob(b64Data, contentType, sliceSize = 512) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return URL.createObjectURL(blob);
  }

  closeThisModal(close: boolean) {
    if (close) {
      this.dialogRef.close();
    }
  }

}
