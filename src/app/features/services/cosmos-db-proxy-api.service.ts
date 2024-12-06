import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CosmosDbProxyApiService {
  static storeDataEndpoint = "https://data-and-trust-alliance-data-provenance-standards.northeurope.cloudapp.azure.com/save";

  constructor(private http: HttpClient) {
  };

  storeDataToDatabase(data: any) {
    return this.postData(CosmosDbProxyApiService.storeDataEndpoint, data);
  };

  postData(url: string, data: any, parameters: HttpParams = new HttpParams()): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          "responseType": "application/json"
        }
      ),
      params: parameters
    };

    return this.http.post(url, data, httpOptions);
  };
}
