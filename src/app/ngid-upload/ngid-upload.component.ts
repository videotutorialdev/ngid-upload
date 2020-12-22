import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Upload } from './upload';
import { UploadFile } from './upload-file';
import { UploadService } from './upload.service';
@Component({
    selector: 'ngid-upload',
    templateUrl: './ngid-upload.component.html',
    styleUrls: ['./ngid-upload.component.scss'],
    providers: [UploadService]
})
export class NgidUploadComponent implements OnInit {
    @Input('dataSource') upload: Upload;
    public uploadProgressList: Array<any> = new Array();
    public uploadStatusClassObject = {
        INQUEUE: 'bg-primary',
        UPLOADED: 'bg-success',
        ONPROGRESS: 'bg-warning',
        FAILED: 'bg-danger',
        ABORTED: 'bg-danger',
        DELETED: 'bg-danger',
        INVALID: 'bg-danger',
    };
    constructor(private uploadService: UploadService) {}

    ngOnInit(): void {}

    handleChange(event: any): void {
        this.upload.setUploadFiles(event.target.files);
    }

    handleChangeUpload(event: any, index: number): void {
        this.upload.addFileToUploadFileListWithIndex(event.target.files[0], index);
        const uploadFile: UploadFile = this.upload.uploadFileList[index];
        this.doUpload(uploadFile, index);
    }

    handleUpload(): void {
        this.upload.uploadFileList.forEach((uploadFile: UploadFile, index: number) => { 
            this.doUpload(uploadFile, index);
        })
    }


    handleCancelUpload(index:number): void {
        this.uploadProgressList[index].unsubscribe();
        this.upload.uploadFileList[index].setStatus('ABORTED');
        this.upload.uploadFileList[index].setProgress(0);
    }

    handleReUpload(uploadFile: UploadFile, index: number): void {
        this.doUpload(uploadFile, index);
    }

    private doUpload(uploadFile: UploadFile, index: number): void {
        if (uploadFile.status === 'INQUEUE') {
            uploadFile.setStatus('ONPROGRESS');
            this.uploadProgressList[index] = this.uploadService.upload(this.upload.stringUrl, uploadFile.formData).subscribe((response: any) => {
                if (response.type === HttpEventType.UploadProgress) {
                    uploadFile.setProgress(response);
                } else if (response instanceof HttpResponse) {
                    uploadFile.setStatus('UPLOADED');
                }
            }, (error: HttpErrorResponse) => {
                uploadFile.setStatus('FAILED');
                uploadFile.setProgress(0)
            })
        }
    }
}