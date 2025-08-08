import { Injectable } from '@angular/core';
import { UserData } from './user-data';

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor(){
    const data = localStorage.getItem('data');
    if(data){
      this.usersData = JSON.parse(data);
    }
  }

  UserDetails = [
    {
      id: 1,
      username:"Manager",
      password:"123"
    },
    {
      id: 2,
      username:"User A",
      password:"123"
    },
    {
      id: 3,
      username:"User B",
      password:"123"
    }
  ];

  usersData:UserData[] = [];


}
