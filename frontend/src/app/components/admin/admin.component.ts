import { Component, OnInit, ViewChild, ChangeDetectorRef, SimpleChanges, OnChanges  } from '@angular/core';
import { AuthService } from './../../shared/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute } from '@angular/router';
import { Callback } from './../../shared/call-back';
import {User} from './../../shared/user';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  events: string[] = [];
  callBackData: any = [];
  startDate : any;
  endDate: any;
  date :any;
  date1 :object = {};
  public endpoint = 'http://localhost:4000/api';
  id:any;
  data:any;
  data1:any;
  currentUser: Object = {};
  user:any;
  currentUser1:User;
  isLoading = true;
  

dataSource:MatTableDataSource<Callback>;
@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
displayedColumns: string[] = ['ticketID','ldap','reason', 'date', 'time','action'];
// const index = this.dataSource.data.findIndex(d => Number(d.id) == Number(id)); 

  constructor(
  private flashMessage: FlashMessagesService,
  public authService: AuthService,
    private actRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {

    //checking for logged in user.
    this.currentUser1 = this.authService.currentUserValue;
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getAdminProfile(id).subscribe(res => {
      this.currentUser = res.msg;
    })
    //Generating Mattable with callback data.
    this.authService.GetCallBackDetails().subscribe(data=>{
      this.callBackData = data;
      this.dataSource = new MatTableDataSource<Callback>(this.callBackData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })
   } 

  ngOnInit() {
    this.refreshDataSource();
  
    }

    refreshDataSource(){
          //Generating Mattable with callback data.
          this.authService.GetCallBackDetails().subscribe(data=>{
            this.callBackData = data;
            this.dataSource = new MatTableDataSource<Callback>(this.callBackData);
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
            }, 0);
          })
        }
 

        
//Mark callBack as Done.
updateCallBackDetails(row){
  let id = row._id;
  const updateCallBack = {
    _id:id,
    done:"Yes",
    supervised_by:this.currentUser1.email,
  }
  this.authService.updateCallBack(updateCallBack).subscribe( data1 => {
    console.log(data1);
    if(data1) 
    {
      this.flashMessage.show('CallBack Updated', {cssClass: 'alert-success', timeout: 3000});
      this.refreshDataSource();
    } else {
      this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      this.refreshDataSource();
    }
  })

}



}
