export class Media {
    file: File;
    binaryFile: Uint8Array;
    encoding: string;
    altText: string;

    public async fileAsUint8Array() {
        return new Promise((resolve, reject) => {
            if (this.binaryFile) {
                resolve(this.binaryFile);
            } else {
                const fileReader = new FileReader();
    
                fileReader.onload = (event: ProgressEvent<FileReader>) => {
                    const base64Img = event.target.result as string;
                    const rawImage = window.atob(base64Img.substring(base64Img.indexOf(';base64,') + 8));
                    this.encoding = base64Img.substring(base64Img.indexOf(":")+1, base64Img.indexOf(";"))
                    const binaryImage = new Uint8Array(new ArrayBuffer(rawImage.length));
                    for (let i = 0; i < rawImage.length; i++) {
                        binaryImage[i] = rawImage.charCodeAt(i)
                    }
                    this.binaryFile = binaryImage;
                    resolve(this.binaryFile);
                };

                fileReader.onerror = reject;
    
                fileReader.readAsDataURL(this.file);
            }
        })
        
    }
}