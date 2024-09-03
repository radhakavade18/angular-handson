// mime-type tasks
// 1. get the value of the control (file)
// 2. read file using fileReader
// 3. check for that file mime type

import { AbstractControl } from "@angular/forms";
import { Observable, Observer, of } from "rxjs";

export const mimeTypeValidator = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  if (typeof control.value === "string") {
    return of({});
  }
  // 1.
  const file = control.value as File;

  // 2.
  const fileReader = new FileReader();
  const frObs = Observable.create(
    (observer: Observer<{ [key: string]: any }>) => {
      fileReader.addEventListener("loadend", () => {
        const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(
          0,
          4
        );
        let header = "";
        let isValid = false;
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }

        switch (header) {
          case "89504e47": // PNG
            isValid = true;
            break;
          case "ffd8ffe0": // JPEG
          case "ffd8ffe1": // JPEG
          case "ffd8ffe2": // JPEG
          case "ffd8ffe3": // JPEG
          case "ffd8ffe8": // JPEG
            isValid = true;
            break;
          case "25504446": // PDF
            isValid = false;
            break;
          default:
            isValid = false; // Unknown file type
            break;
        }
        if (isValid) {
          observer.next({});
        } else {
          observer.next({ invalidMimeType: true });
        }
        observer.complete();
      });
      fileReader.readAsArrayBuffer(file);
    }
  );
  return frObs;
};
