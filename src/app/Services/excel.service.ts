import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx'; 

@Injectable({
  providedIn: 'root'
})
export class ExcelService {



  fileName= 'CandidateList.xlsx';  
  constructor() { }

  mimeParse(file) {
    //object that used to convert regular file extensions to mime types,

    let mimes = {
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "docx",
      "image/jpeg": "jpg",
      "image/gif": "gif",
      "application/msword": "doc",
      "image/tiff": "tif",
      txt: "text/plain",
      "video/mpeg": "mp4",
      "application/vnd.ms-powerpoint": "ppt",
      "application/pdf": "pdf",
      "application/vnd.ms-excel": "xls",
      "image/png": "png",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        "xlsx",
      "audio/mpeg": "mp3",
    };

    return mimes[file.toLowerCase()];
  }



exportToExcel(table): void 
    {
 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(table);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }
}
