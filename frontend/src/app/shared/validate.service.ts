import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(newCallBack) {
    if(newCallBack.ticketID == undefined 
      || newCallBack.ldap == undefined 
      || newCallBack.reason == undefined 
      || newCallBack.date == undefined
      ||newCallBack.time == undefined
      
      ) {
        return false;
    } else {
      return true;
    }
  }

  validateEmail(ldap) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(ldap);
  }


}
