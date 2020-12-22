import { Component, OnInit } from '@angular/core';
import { Upload } from './ngid-upload/upload';
import { UploadOptions } from './ngid-upload/upload-options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-upload';
  private uploadOptions: UploadOptions = {
     formDataName: 'files', 
     stringUrl: 'http://localhost:3000/api/v1/upload',
     maxFile: 2,
     maxSize: 1000000,
     allowedExtension: 'docx,xls,doc'
  };
  public upload: Upload = new Upload(this.uploadOptions);

  constructor() {}

  ngOnInit(): void {
    console.log(this.upload);
  }

  handleCheckUpload(): void {
    console.log('Info: Come from handleCheckUpload');
    console.log(this.upload);
}
}
