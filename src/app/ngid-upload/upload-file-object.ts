
export class UploadFileObject {
    name: string;
    size: number;
    lastModified: number;
    type: string;
    constructor(file: File) {
        this.name = file.name;
        this.size = file.size;
        this.lastModified = file.lastModified;
        this.type = file.type;
    }
}