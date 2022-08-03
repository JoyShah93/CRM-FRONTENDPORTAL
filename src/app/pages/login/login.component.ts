import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: '',
  }

  constructor(private login: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  formLogin(loginform: any) {
    console.log('login button click');

    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      alert('username is required')
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      alert('password is required')
      return;
    }

    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);

        //login
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            console.log(user);
            //rediarect ...ADMIN : admin-dashboard
            //rediarect ...USER: user-dashboard
            //rediarect ...MANAGER: manager-dashboard

            if (this.login.getUserRole() == 'ADMIN') {
             // window.location.href = '/admin';
             this.router.navigate(['admin']);
             this.login.loginStatusSubject.next(true);

            }
            else if (this.login.getUserRole() == 'USER') {
              //window.location.href = '/user';
              this.router.navigate(['user']);
              this.login.loginStatusSubject.next(true);

            }
            else if (this.login.getUserRole() == 'MANAGER') {
              //window.location.href = '/manager';
              this.router.navigate(['manager']);
              this.login.loginStatusSubject.next(true);

            }
            else {
              this.login.logout();

            }
          });
      },
      (error) => {
        console.log('Error !!');
        console.log(error);
        alert('invalid Username OR Password');


      }
    )

    //request to generate token
  }

}
