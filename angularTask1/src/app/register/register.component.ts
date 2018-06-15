import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _service: ServiceService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  newUser: any
  error_message: any
  errors: boolean

  ngOnInit() {
    this.newUser = {
    }
    this.errors = false
  }

  submitClicked() {
    console.log("this.newUser has: ", this.newUser)
    let obs = this._service.createUser(this.newUser)
    obs.subscribe(data => {

      if (data['error']) {
        console.log("data is: ", data)
        this.errors = true
        this.error_message = data['error']['message']
      } else {
        console.log("yay submitClicked data: ", data)
        this._router.navigate(['/dashboard']);
      }
    })
  }

}
