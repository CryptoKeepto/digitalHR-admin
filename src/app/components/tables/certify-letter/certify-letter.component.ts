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
  private pageTotals: any;
  private pagination: number[] = [];
  private usersChecked: any[] = [];

  constructor(private certifyLetterService: CertifyLetterService) { }

  ngOnInit() {
    this.getCertifyLetterAll();
  }

  private getCertifyLetterAll() {
    this.certifyLetterService.getCertifyLetterAll(1, 10)
      .subscribe(
        (res) => {
          this.users = res.message.data;
          this.pageTotals = res.message.pageTotals;
        },
        (err) => { },
        () => {
          for (let i = 0; i < this.pageTotals; i++) {
            this.pagination.push(i);
          }
        }
      );
  }

  private itemPagination(item: number) {
    this.certifyLetterService.getCertifyLetterAll(item, 10)
      .subscribe(
        (res) => {
          this.users = res.message.data;
        },
        (err) => { },
        () => {
          for (let i = 0; i < $("input:checkbox").length; i++) {
            $("input:checkbox")[i].checked = false;
          }
          // clear value all page
          this.usersChecked = [];
          console.log(this.usersChecked);
        }
      );
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
    const result: boolean = confirm("Reject ?");
    if (result) {
      for (let i = 0; i < this.usersChecked.length; i++) {
        this.users.forEach((e) => {
          if (this.usersChecked[i].ticketID === e.ticketID) {
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
                  window.location.reload();
                }
              );
          }
        });
      }
    }
  };

  private complete(status: number): void {
    const result: boolean = confirm("Complete ?");
    if (result) {
      ;
      for (let i = 0; i < this.usersChecked.length; i++) {
        this.users.forEach((e) => {
          if (this.usersChecked[i].ticketID === e.ticketID) {
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
                  window.location.reload();
                }
              );
          }
        });
      }
    }
  }

  private checkedChange(user, event): void {
    let checked = event.target.checked;
    let userId = user.ticketID;
    if (checked) {
      this.users.forEach((user) => {
        if (user.ticketID === userId) {
          this.usersChecked.push(user);
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
        this.usersChecked.push(user);
      })
    } else {
      // input not checked
      this.usersChecked = [];
      for (let i = 0; i < $("input:checkbox").length; i++) {
        $("input:checkbox")[i].checked = false;
      }
    }
  };

  private generateWord() {

    // todo last attibute set default value
    // this.usersChecked = [];
  }

  private generateExcel() {

    // this.usersChecked = [];
  }

  private generatePdf() {

    // this.usersChecked = [];

  }

}
