import { Component, OnInit } from '@angular/core';
import { CertifyLetterService } from "../../../services/certify-letter.service";

declare let $: any;

@Component({
  selector: 'app-certify-letter',
  templateUrl: './certify-letter.component.html',
  styleUrls: ['./certify-letter.component.css']
})
export class CertifyLetterComponent implements OnInit {

  private users: any[];
  private usersChecked: string[] = [];

  constructor(private certifyLetterService: CertifyLetterService) { }

  ngOnInit() {
    this.certifyLetterService.getCertifyLetterAll().subscribe((res) => this.users = res.message);
  }

  private getDate(): string {
    const d: any = new Date();
    const year: any = d.getFullYear().toString();
    let month: any = d.getMonth() + 1;
    let day: any = d.getDate().toString();
    let hour: any = d.getHours();
    let minute: any = d.getMinutes();
    let second: any = d.getSeconds();
    if (month.toString().length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    if (hour.toString().length < 2) { hour = '0' + hour; }
    if (minute.toString().length < 2) { minute = '0' + minute; }
    if (second.toString().length < 2) { second = '0' + second; }
    const result = [year, month, day].join('-') + ' ' + [hour, minute, second].join(':');
    return result;
  }

  private reject(status: number): void {
    for (let i = 0; i < this.usersChecked.length; i++) {
      this.users.forEach((e) => {
        if (this.usersChecked[i] === e.ticketID) {
          const modified = this.getDate();
          this.certifyLetterService.putCertifyLetter(e.ticketID, status, this.getDate())
            .subscribe(
              (res) => console.log(res.message),
              (err) => console.error(err),
              () => {
                this.usersChecked = [];
                for (let i = 0; i < $("input:checkbox").length; i++) {
                  $("input:checkbox")[i].checked = false;
                }
                this.ngOnInit();
              }
            );
        }
      });
    }
  }

  private complete(status: number): void {
    for (let i = 0; i < this.usersChecked.length; i++) {
      this.users.forEach((e) => {
        if (this.usersChecked[i] === e.ticketID) {
          const modified = this.getDate();
          this.certifyLetterService.putCertifyLetter(e.ticketID, status, this.getDate())
            .subscribe(
              (res) => console.log(res.message),
              (err) => console.error(err),
              () => {
                this.usersChecked = [];
                for (let i = 0; i < $("input:checkbox").length; i++) {
                  $("input:checkbox")[i].checked = false;
                }
                this.ngOnInit();
              }
            );
        }
      });
    }
  }

  private checkedChange(user, event): void {
    let checked = event.target.checked;
    let userId = user.ticketID;
    if (checked) {
      this.users.forEach((user) => {
        if (user.ticketID === userId) {
          this.usersChecked.push(userId);
        }
      });
    } else {
      this.users.forEach((user) => {
        if (user.ticketID === userId) {
          this.usersChecked.splice(this.usersChecked.findIndex((v) => v === userId), 1);
        }
      });
    }
  };

  private checkedAll(event): void {
    // init usersChecked = [];
    this.usersChecked = [];
    let checked = event.target.checked;
    if (checked) {
      // input checked
      for (let i = 1; i < $("input:checkbox").length; i++) {
        $("input:checkbox")[i].checked = true;
      }
      this.users.forEach((user) => {
        this.usersChecked.push(user.ticketID);
      })
    } else {
      // input not checked
      for (let i = 0; i < $("input:checkbox").length; i++) {
        $("input:checkbox")[i].checked = false;
      }
      this.usersChecked = [];
    }
  };
}
