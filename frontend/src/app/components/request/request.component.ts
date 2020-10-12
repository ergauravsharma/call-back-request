import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { ValidateService } from './../../shared/validate.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  form:FormGroup;
  // requestForm: FormGroup;
  submitted = false;
  ticketID:String;
  ldap:String;
  date:Date;
  time:String;
  reason:String;
  done:String;
  supervised_by:String;
  supervised_date:Date;
  // @ViewChild ('f') myForm;

  constructor(
    private validateService: ValidateService,
    public fb: FormBuilder,
    public authService:AuthService,
    private http:HttpClient,
    private flashMessage: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
    
  }


  onRequestSubmit(){

    const newCallBack = {
      ticketID:this.ticketID,
      ldap: this.ldap,
      reason: this.reason,
      date: this.date,
      time: this.time,
      done: this.done,
      supervised_by:this.supervised_by,
      supervised_date:this.supervised_date
    }

    if(!this.validateService.validateRegister(newCallBack)){
this.flashMessage.show('Please fill in all the fields',{cssClass:'alert-danger', timeout:3000});
return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(newCallBack.ldap)) {
      this.flashMessage.show('Please use a valid ldap email', {cssClass: 'alert-danger', timeout: 3000});
        return false;
      }

   this.authService.addCallBack(newCallBack).subscribe(data => {
   


    if(data.success) {
      this.flashMessage.show('Callback details Saved.', {cssClass: 'alert-success', timeout: 3000});
      // this.myForm.resetForm(); 
    } 
    else {
      this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      //this.router.navigate(['/register']);
    }
  });
  }

}
