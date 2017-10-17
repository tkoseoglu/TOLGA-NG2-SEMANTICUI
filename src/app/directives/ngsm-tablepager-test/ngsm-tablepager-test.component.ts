import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from "rxjs";
import { User } from '../../app-models/user';

@Component({
  selector: 'ngsm-tablepager-test',
  templateUrl: './ngsm-tablepager-test.component.html',
  styleUrls: ['./ngsm-tablepager-test.component.css']
})
export class NgsmTablepagerTestComponent implements OnInit {

  rawUsers: Array<User> = new Array<User>();
  users: Observable<User>;
  ngsmTablepagerUsers: Array<User> = new Array<User>();
  ngsmTablepagerTotalNumberOfUsers: number = 0;
  ngsmTablepagerConfig = {
    page: 0,
    pageSize: 10
  };
  ngsmTablepagerUsage: string = "<ngsm-tablepager [totalNumberOfRecords]=\"\" [selectedPageSize]=\"\" [selectedPage]=\"\" (onPageSizeChange)=\"\" (onPageChange)=\"\"></ngsm-tablepager>";

  constructor() { }

  getUsers() {
    let startIndex = this.ngsmTablepagerConfig.page * this.ngsmTablepagerConfig.pageSize;
    let endIndex = startIndex + this.ngsmTablepagerConfig.pageSize;
    let filteredUsers = this.users.skip(this.ngsmTablepagerConfig.page * this.ngsmTablepagerConfig.pageSize).take(this.ngsmTablepagerConfig.pageSize);
    this.ngsmTablepagerUsers = new Array<User>();
    filteredUsers.subscribe(val => this.ngsmTablepagerUsers.push(val));
  }

  newPageSize(pageSize: number) {
    this.ngsmTablepagerConfig.pageSize = pageSize;
    this.ngsmTablepagerConfig.page = 0;
    this.getUsers();
  }

  newPage(page: number) {
    this.ngsmTablepagerConfig.page = page;
    this.getUsers();
  }

  private seedTablePager() {
    this.rawUsers.push(new User("Tom", "Jones", new Date("1/1/1970")));
    this.rawUsers.push(new User("Peter", "Fonda", new Date("10/11/1950")));
    this.rawUsers.push(new User("Michael", "Moore", new Date("10/11/1950")));
    this.rawUsers.push(new User("Arnold", "Schwarzenegger", new Date("10/11/1950")));
    this.rawUsers.push(new User("Sylvester", "Stallone", new Date("10/11/1950")));
    this.rawUsers.push(new User("Bruce", "Willis", new Date("10/11/1950")));
    this.rawUsers.push(new User("Peter", "Ustinov", new Date("10/11/1950")));
    this.rawUsers.push(new User("Clark", "Gable", new Date("10/11/1950")));
    this.rawUsers.push(new User("Boris", "Becker", new Date("10/11/1950")));
    this.rawUsers.push(new User("Ivan", "Lendle", new Date("10/11/1950")));

    this.rawUsers.push(new User("Juergen", "Schult", new Date("10/11/1950")));
    this.rawUsers.push(new User("Lars", "Riedel", new Date("10/11/1950")));
    this.rawUsers.push(new User("Carl", "Malone", new Date("10/11/1950")));
    this.rawUsers.push(new User("Michael", "Jordan", new Date("10/11/1950")));
    this.rawUsers.push(new User("Bruce", "Wayne", new Date("10/11/1950")));
    this.rawUsers.push(new User("Jackie", "Chan", new Date("10/11/1950")));
    this.rawUsers.push(new User("Patrick", "Stewart", new Date("10/11/1950")));
    this.rawUsers.push(new User("Jennifer", "Weil", new Date("10/11/1950")));
    this.rawUsers.push(new User("Alejandro", "Martinez", new Date("10/11/1950")));
    this.rawUsers.push(new User("Bill", "Schmill", new Date("10/11/1950")));

    this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    this.rawUsers.push(new User("Jeff", "Morgan", new Date("10/11/1950")));
    this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    this.rawUsers.push(new User("Jeff", "Morgan", new Date("10/11/1950")));
    this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));

    this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    this.rawUsers.push(new User("Jeff", "Morgan", new Date("10/11/1950")));
    this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    this.rawUsers.push(new User("Jeff", "Morgan", new Date("10/11/1950")));
    this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));


    this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    this.rawUsers.push(new User("Jeff", "Morgan", new Date("10/11/1950")));
    this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    this.rawUsers.push(new User("Jeff", "Morgan", new Date("10/11/1950")));
    this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));

    this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    this.rawUsers.push(new User("Jeff", "Morgan", new Date("10/11/1950")));
    this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    this.rawUsers.push(new User("Jeff", "Morgan", new Date("10/11/1950")));
    this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));

    this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    this.rawUsers.push(new User("Jeff", "Morgan", new Date("10/11/1950")));
    this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));
    this.rawUsers.push(new User("Jeff", "Morgan", new Date("10/11/1950")));
    this.rawUsers.push(new User("Lala", "Jackson", new Date("10/11/1950")));
    this.rawUsers.push(new User("Kayla", "Smith", new Date("10/11/1950")));

    this.users = Observable.from(this.rawUsers);
    this.ngsmTablepagerTotalNumberOfUsers = this.rawUsers.length;
  }

  ngOnInit() {
    this.seedTablePager();
  }

}
