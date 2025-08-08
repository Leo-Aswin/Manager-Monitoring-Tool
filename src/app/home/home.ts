import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Service } from '../service';
import { UserData } from '../user-data';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  userData: UserData[] = [];
  currentUser: any;
  comments = '';
  title = '';
  managerComments = '';
  uniqueName = '';
  managerCommentsUI = 'none';
  tempData: any;

  constructor(private myService: Service) {
    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser == '') {
      location.replace('https://manager-monitoringtool.netlify.app/');
    }
    if (this.currentUser == 'Manager') {
      this.userData = this.myService.usersData.reverse();
      this.tempData = this.userData;
      this.managerCommentsUI = '';
    } else {
      this.tempData = this.myService.usersData;
      this.userData = this.tempData.filter(
        (data: any) => data.name == this.currentUser
      );
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: Event) {
    localStorage.setItem('currentUser', '');
  }

  submit() {
    let validData: any = [];
    if (this.currentUser == 'Manager') {
      this.userData.forEach((data) => {
        if (
          data.name == this.uniqueName &&
          data.title == this.title &&
          data.desc == this.comments
        ) {
          data.manager = this.managerComments;
          validData.push(data);
        } else {
          validData.unshift(data);
        }
      });
      this.userData = validData;
    } else {
      this.tempData.push({
        name: this.currentUser,
        title: this.title,
        desc: this.comments,
      });

      this.userData.push({
        name: this.currentUser,
        title: this.title,
        desc: this.comments,
        manager: '',
      });
    }

    this.title = '';
    this.comments = '';
    this.managerComments = '';
    localStorage.setItem('data', JSON.stringify(this.tempData));
  }

  refresh() {
    localStorage.setItem('currentUser', '');
    location.replace('https://manager-monitoringtool.netlify.app/');
  }

  checker(data: any) {
    if (data) {
      return 'none';
    } else {
      return '';
    }
  }

  update(name: any, title: any, comments: any) {
    this.uniqueName = name;
    this.title = title;
    this.comments = comments;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
