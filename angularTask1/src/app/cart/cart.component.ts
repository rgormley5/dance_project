import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private _service: ServiceService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  total: number
  items: any
  showTotal = this._service.cartPageShowTotal
  showTheModal: boolean
  continueToPaypal: boolean
  // modalLoginPassword: any
  // modalLoginEmail: any
  errors: any
  error_message: any
  thisUser: any

  ngOnInit() {
    this.getAllCartItems();
    this.showTheModal = false;
    this.showTotal = this._service.cartPageShowTotal;
    console.log("showSubtotal is: ", this.total)
    let obs1 = this._service.checkUserInSession();
    obs1.subscribe(data => {
      console.log("checkUserInSesion data is: ", data['user_id'])
      // save user id to service
      this._service.loggedInUser = data['user_id'];
    })
  }

  getAllCartItems() {
    this.items = this._service.cartArr;
    this.showTotal = true;
    this.total = this._service.cartArr.length * 49.99;
    console.log("subtotal is: ", this.total)
    console.log("showSubtotal is: ", this.showTotal)
  }

  removeButtonClicked(item_ID) {
    console.log("item_ID is: ", item_ID);
    this._service.removeCartItem(item_ID);
  }

  checkoutButtonClicked() {
    console.log("checkout button clicked");
    console.log("this._service.loggedInUser is: ", this._service.loggedInUser)
    if (this._service.loggedInUser !== undefined) {
      // proceed to paypal
      console.log("in loggedInUser is not undefined")
    } else {
      // modal popup register/login
      console.log("want to show modal")
      this.showTheModal = true;
      console.log("this.showTheModal is: ", this.showTheModal)
    }
  }

  modalLoginSubmitted(loginEmail, loginPassword) {
    console.log("modal login button clicked")
    // go to service, check for user in db
    // if successful, proceed to paypal

    // this.modalLoginEmail = loginEmail;
    // this.modalLoginPassword = loginPassword;

    this.thisUser = {
      "userEmail": loginEmail,
      "userPassword": loginPassword
    }

    console.log("loginEmail is: ", loginEmail)

    let obs = this._service.findUser(this.thisUser)
    console.log("started this._service.findUser")
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
          console.log("user is logged in!")
          let obs2 = this._service.checkUserInSession();
          obs2.subscribe(data => {
            console.log("user in session is: ", data['user_id'])
          })
        }
      }
    })
  }

  modalRegisterSubmitted() {
    console.log("modal register button clicked")
    // go to service, add user to db
    // if successful, proceed to paypal

  }

}
