import { Component, OnInit } from '@angular/core';
import {FileUploadService} from './file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file

  // Inject service
  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  // On file Select
  onChange(event) {
      this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
      this.loading = !this.loading;
      console.log(this.file);
      this.fileUploadService.upload(this.file).subscribe(
          (event: any) => {
              if (typeof (event) === 'object') {
                  this.loading = false; // Flag variable
              }
          }
      );
  }

}
