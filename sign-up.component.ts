import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';
import { createElementCssSelector } from '@angular/compiler';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  showSuccessMessage: boolean;
  showErrorMessage: string;
  showError: boolean;
  constructor(public userService: UserService) { }

  ngOnInit()
  {
  }
  onSubmit(form : NgForm)
  {
    this.userService.postUser(form.value).subscribe(
      res =>{
        this.showSuccessMessage = true;
        setTimeout(()=> this.showSuccessMessage = false,3000);
        this.resetForm(form);
      },
      err =>{
       if(err.status == 422)
       {
         this.showErrorMessage= err.error;
         this.showError=true;
         setTimeout(()=> this.showError = false,3000);
       }
       else
       {
         this.showErrorMessage = 'Something Went Wrong.Please contact admin';
         
         this.showError=true;
         setTimeout(()=> this.showError = false,3000);
       }
      });
  }
    
  resetForm(form : NgForm)
  {
    this.userService.selectedUser = 
    {
      fullName:'',
      email:'',
      password:''
    };
    form.resetForm();
    this.showErrorMessage='';
  }
}
