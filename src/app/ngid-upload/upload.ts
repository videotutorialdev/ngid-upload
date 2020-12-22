import { EventEmitter } from '@angular/core';
import { UploadFile } from './upload-file';
import { UploadFileStatus } from './upload-file-status-type';
import { UploadOptions } from './upload-options';
import { UploadValidator } from './upload-validator';

export class Upload {
    uploadFileList: Array<UploadFile> = new Array();
    formData: FormData = new FormData();
    formDataName: string;
    stringUrl: string;
    status: UploadFileStatus;
    statusChanges: EventEmitter<UploadFile[]> = new EventEmitter();
    constructor(private options: UploadOptions) {
        this.formDataName = this.options.formDataName;
        this.stringUrl = this.options.stringUrl;
    }

    setStatus(status: UploadFileStatus): void {
        this.status = status;
        this.statusChanges.emit(this.uploadFileList);
    }

    setUploadFiles(files: Array<File>): void {
        Object.values(files).forEach((file: File) => {
           this.addFileToUploadFileList(file);
           this.addFileToFormData(file);
        })
    };

    addFileToUploadFileList(file: File): void {
        const uploadFile: UploadFile = new UploadFile(this, file);
        this.validateUploadFile(uploadFile);
        uploadFile.setFormData(file);
        this.uploadFileList.push(uploadFile);
    }

    addFileToUploadFileListWithIndex(file: File, index: number): void {
        const uploadFile: UploadFile = new UploadFile(this, file);
        uploadFile.setFormData(file);
        this.validateUploadFile(uploadFile);
        this.uploadFileList[index] = uploadFile;
    }

    addFileToFormData(file: File): void {
        this.formData.append(this.formDataName, file, file.name);
    }

    deleteUploadFile(uploadFile: UploadFile): void {
        if (uploadFile.status !== 'UPLOADED') {
            const indexOfUploadFile = this.uploadFileList.findIndex((uf: UploadFile) => uf === uploadFile);
            this.uploadFileList.splice(indexOfUploadFile, 1);
        } else {
            uploadFile.setStatus('DELETED');
        }
    }

    validateUploadFile(uploadFile: UploadFile): void {
        const validate = new UploadValidator(<File>uploadFile.file)
        .extension(this.options.allowedExtension)
        .maxSize(this.options.maxSize);
        if (!validate.valid) {
            uploadFile.setStatus('INVALID');
            uploadFile.setError(validate.error);
        }
    }
}