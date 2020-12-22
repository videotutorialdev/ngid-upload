import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UploadValidatorError } from './upload-validator-error';
export class UploadValidator {
    valid: boolean;
    error: UploadValidatorError = new UploadValidatorError();
    constructor(private file: File) {
        this.valid = true;
    }

    public extension(extension: string): this {
        if (this.valid) {
            const lastIndexOfDot = this.file.name.lastIndexOf('.');
            const fileNameExtension = this.file.name.slice(lastIndexOfDot + 1, this.file.name.length);
            const indexOfFileNameExtension = extension.split(',').indexOf(fileNameExtension)
            if (indexOfFileNameExtension === -1) {
                this.valid = false;
                this.error.type = 'EXTENSION_ERROR';
                this.error.message = `EXTENSION ALLOWED IS ${extension}`;
            }
        }
        return this;
    }

    public maxSize(maxSize: number): this {
        if (this.valid) {
            if (this.file.size > maxSize) {
                this.valid = false;
                this.error.type = 'MAX_SIZE_ERROR';
                this.error.message = `MAX SIZE ALLOWED IS ${maxSize / 1000000} MB`;
            }
        }
        return this;
    }
}