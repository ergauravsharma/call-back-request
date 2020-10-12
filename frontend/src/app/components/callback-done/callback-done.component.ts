import { Component, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { AuthService } from './../../shared/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute } from '@angular/router';
import { Callback } from './../../shared/call-back';
import {User} from './../../shared/user';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-callback-done',
  templateUrl: './callback-done.component.html',
  styleUrls: ['./callback-done.component.css']
})
export class CallbackDoneComponent implements OnInit {
  events: string[] = [];
  callBackData: any = [];
  startDate : any;
  endDate: any;
  date :any;
  date1 :any;
  public endpoint = 'http://localhost:4000/api';
  id:any;
  data:any;
  data1:any;
  currentUser: Object = {};
  user:any;
  currentUser1:User;

dataSource:MatTableDataSource<Callback>;
@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
displayedColumns: string[] = ['ticketID','ldap','reason', 'date', 'time', 'supervised_by','supervised_date'];


  constructor(
  private flashMessage: FlashMessagesService,
  public authService: AuthService,
    private actRoute: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {


    //checking for logged in user.
    this.currentUser1 = this.authService.currentUserValue;

      //Generating Mattable with callback data.
      this.authService.GetCallBackDoneDetails().subscribe(data=>{
        this.callBackData = data;
        this.dataSource = new MatTableDataSource<Callback>(this.callBackData);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      })

  }

}
