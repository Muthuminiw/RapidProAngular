import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  succesMsg = 'Upload Sucssess';
  errorMsg = 'Upload Failed';

  fileInfos?: Observable<any>;
  constructor(private uploadService: UploadCarDataService,private toastr: ToastrService) { }

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
             
              this.toastr.success(this.succesMsg, "", {
                timeOut: 2000,
              });
              // this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
            this.toastr.success(this.errorMsg, "", {
              timeOut: 2000,
            });
  
            this.currentFile = undefined;
          });
      }
  
      this.selectedFiles = undefined;
    }
  }
}

