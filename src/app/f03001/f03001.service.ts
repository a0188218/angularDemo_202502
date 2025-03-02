import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class F03001Service extends BaseService {

  uploadExcel(baseUrl: string, fileToUpload: File, empNo: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('empNo', empNo);
    formData.append('userId', BaseService.userId);
    return this.httpClient.post<any>(environment.allowOrigin + '/' + baseUrl, formData);
  }

}
