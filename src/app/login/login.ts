import { Component } from '@angular/core';
import { Service } from '../service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  userData:any;
  username = "";
  password = "";
  error = "";
  c = 0;

  constructor(private myService:Service) {}

  ngOnInit(): void {
    this.userData = this.myService.UserDetails; 
  }

  submit(){
    this.userData.forEach((data: { username: any; password: string; }) => {
      if(data.username == this.username){
        this.c = 1;
        if(data.password == this.password){
          this.error = "";
          localStorage.setItem('currentUser',data.username);
          location.replace('http://localhost:4200/data');
        }
        else{
          this.error = "Password Mismatch";
        }
      }
    });

    this.c == 0 ? this.error = "Email Not Found": "";
  }
}
