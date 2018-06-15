import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _service: ServiceService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  thisUser: any
  error_message: any
  errors: boolean

  ngOnInit() {
    this.errors = false
  }

  loginClicked(email, password) {
    this.thisUser = {
      "userEmail": email,
      "userPassword": password
    }

    let obs = this._service.findUser(this.thisUser)
    obs.subscribe(data => {
      if (data['error']) {
        console.log("data is: ", data)
        this.errors = true
        this.error_message = data['error']
        if (data['error']['message']) {
          this.error_message = "invalid username or password"
        }
      } else {
        console.log("yay loginClicked data: ", data)
        this._service.tempID = data
        if (data['error']) {
          console.log("we in HERE")
          this.errors = true
          this.error_message = data['error']
        } else {
          this._router.navigate(['/dashboard'])
        }
      }
    })
  }

  // loginClicked(email, password) {
  //   let obs = this._service.getThisUser(this.thisUser)
  //   obs.subscribe(data => {
  //     if (data['error']) {
  //       console.log("data is: ", data)
  //       this.errors = true
  //       this.error_message = data['error']['message']
  //     } else {
  //       console.log("yay loginClicked data: ", data)
  //       this._router.navigate(['/dashboard'])
  //     }
  //   })
  // }

}
