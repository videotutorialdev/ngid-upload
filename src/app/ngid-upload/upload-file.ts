import { HttpProgressEvent } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Upload } from './upload';
import { UploadFileObject } from './upload-file-object';
import { UploadFileStatus } from './upload-file-status-type';
import { UploadValidator } from './upload-validator';
import { UploadValidatorError } from './upload-validator-error';

export class UploadFile {
    file: UploadFileObject;
    progress: number;
    formData: FormData = new FormData();
    status: UploadFileStatus;
    statusChanges: EventEmitter<UploadFile> = new EventEmitter();
    error: UploadValidatorError;
    constructor(public parent: Upload , file: File) {
        this.file = new UploadFileObject(file);
        this.status = 'INQUEUE';
    }

    setStatus(status: UploadFileStatus): void {
        this.status = status;
        this.statusChanges.emit(this);
    }

    setFormData(file: File): void {
        this.formData.append(this.parent.formDataName, file, file.name);
    }

    setProgress(response: HttpProgressEvent | number): void {
       if (typeof response === 'number') {
           this.progress = response;
       } else {
           this.progress = (response.loaded / response.total) * 100; 
       }
    }

    setError(error: UploadValidatorError) {
        this.error = error;
    }
}