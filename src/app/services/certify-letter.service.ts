import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class CertifyLetterService {

  private url: string = "http://localhost:3000/api";
  constructor(private http: Http) { }

  public getCertifyLetterAll(page: number, rows: number) {
    return this.http.get(`${this.url}/certifyLetter/all?page=${page}&rows=${rows}`).map((value) => value.json());
  }

  public putCertifyLetter(ticketID: string, status: number, modifiedAt: string) {
    const body = {
      "ticketID": ticketID,
      "status": status,
      "modifiedAt": modifiedAt
    };
    return this.http.put(`${this.url}/certifyLetter/updateAll`, body).map((value) => value.json());
  }
}
