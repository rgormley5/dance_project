import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _service: ServiceService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  userID: number

  ngOnInit() {
    console.log("launching dashboard")
    this.findUserForDashboard()
  }

  findUserForDashboard() {
    console.log("in findUserForDashboard()")
    let obs1 = this._service.checkUserInSession();
    obs1.subscribe(data => {
      console.log("findUserForDashboard data is: ", data)
      this.userID = data['user_id'];
    })
  }

}
