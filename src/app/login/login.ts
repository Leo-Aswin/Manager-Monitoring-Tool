import { Component } from '@angular/core';
import { Service } from '../service';
import { Router } from '@angular/router';
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

  constructor(private myService: Service,private router: Router) {}

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
          this.router.navigate(['/data']);
        }
        else{
          this.error = "Password Mismatch";
        }
      }
    });

    this.c == 0 ? this.error = "Email Not Found": "";
  }
}
