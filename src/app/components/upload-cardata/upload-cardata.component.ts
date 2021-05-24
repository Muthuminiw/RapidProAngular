import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadCarDataService } from 'src/app/services/upload-cardata.service';

@Component({
  selector: 'app-upload-cardata',
  templateUrl: './upload-cardata.component.html',
  styleUrls: ['./upload-cardata.component.css']
})
export class UploadFilesComponent implements OnInit {


  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;
  constructor(private uploadService: UploadCarDataService) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event:any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
  
        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = 'Upload Success';
              this.progress = 0;
              // this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
  
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Upload Failed!';
            }
  
            this.currentFile = undefined;
          });
      }
  
      this.selectedFiles = undefined;
    }
  }
}

//   upload(): void {
//     this.progress = 0;

//     this.currentFile = this.selectedFiles.item(0);
//     this.uploadService.upload(this.currentFile).subscribe(
//       event => {
//         if (event.type === HttpEventType.UploadProgress) {
//           this.progress = Math.round(100 * event.loaded / event.total);
//         } else if (event instanceof HttpResponse) {
//           this.message = event.body.message;
//           this.fileInfos = this.uploadService.getFiles();
//         }
//       },
//       err => {
//         this.progress = 0;
//         this.message = 'Could not upload the file!';
//         this.currentFile = undefined;
//       });
//     this.selectedFiles = undefined;
//   }
// }