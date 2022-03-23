import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private _http: HttpClient) { }

  otpPost(data: any) {
    const href = `${ 'http://apps.thinkoverit.com/api/getOTP.php'}`;
   
    return this._http.post(href, data);
  }

  otpVerify(data: any) {
    const href = `${ 'http://apps.thinkoverit.com/api/verifyOTP.php'}`;
   
    return this._http.post(href, data);
  }
}
