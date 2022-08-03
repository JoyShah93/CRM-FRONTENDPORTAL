import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  };

  signupForm= new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
  })

  

  show:boolean = false;
  registered:boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  formSubmit(signup: any){
    //alert('submit');
    console.log(this.user);
    // if(this.user.firstName=='' || this.user.firstName==null ){
    //   alert('FirstName is required')
    //   return;
    // }
    
    // if(this.user.lastName=='' || this.user.lastName==null){
    //   alert('LastName is required')
    //   return;
    // }
    // if(this.user.username=='' || this.user.username==null){
    //   alert('username is required')
    //   return;
    // }
    // if(this.user.password=='' || this.user.password==null){
    //   alert('password is required')
    //   return;
    // }
    // if(this.user.email=='' || this.user.email==null){
    //   alert('email is required')
    //   return;
    // }
    // if(this.user.phone=='' || this.user.phone==null){
    //   alert('phonenumber is required')
    //   return;
    // }
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        this.registered= true;
        console.log(data);
        this.show = true;
        setTimeout(()=>{
        this.show= false;
      },5000);

      },
      (error)=>{
        this.registered= false;
        console.log(error);
        this.show = true;
        setTimeout(()=>{
        this.show= false;
      },5000);

      }
    );

  }

}
