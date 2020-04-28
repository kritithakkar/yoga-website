import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService,private router: Router) { }

  model ={
    email:'',
    password:''
  };
  emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  serverErrorMessage: string;
  ngOnInit()
  {
  }
  onSubmit(form: NgForm)
  {
    this.userService.login(form.value).subscribe(
      res =>
      {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/userprofile');
      },
      err =>
      {
       this.serverErrorMessage= err.error.message;
      }
    )
  }


}
