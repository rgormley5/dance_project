import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ServiceService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  tempID: any
  cartArr = []
  cartItemAdded: boolean;
  cartItemExists: boolean;
  cartPageShowTotal: boolean;
  loggedInUser: any;

  createUser(newUser) {
    return this._httpClient.post('/user', newUser)
  }

  findUser(thisUser) {
    console.log("thisUser is: ", thisUser)
    return this._httpClient.post('/finduser', thisUser)
  }

  addItemToNonUserCart(cartItem) {
    if (this.cartArr.length < 1) {
      this.cartArr.push(cartItem);
      this.cartItemAdded = true;
    } else {
      console.log("cartArr is: ", this.cartArr)
      for (let i = 0; i < this.cartArr.length; i++) {
        if (this.cartArr[i]['item_ID'] === cartItem['item_ID']) {
          this.cartItemExists = true;
          return console.log("item already exists in cart")
        }
      }
      console.log("added item to cart")
      this.cartItemAdded = true;
      this.cartItemExists = false;
      return this.cartArr.push(cartItem); 
    }
    console.log("cartArr is: ", this.cartArr)
    // return this._httpClient.post('/cart', cartItem)  <-- this will be moved to another function
  }

  removeCartItem(item_ID) {
    for (let i = 0; i < this.cartArr.length; i++) {
      if (this.cartArr[i]['item_ID'] === item_ID) {
        let itemRemoved = this.cartArr.splice(i, 1)
        if (this.cartArr.length < 1) {
          this.cartPageShowTotal = false;
        }
      }
    }
  }

  checkUserInSession() {
    return this._httpClient.get('/checkSession')
  }

  // items are saved in cartArr here in the service
  // when user decides to check out, then they can checkout all items from the cart
  // when user decides to check out, I will check session if the user is signed in
    // if not signed in: promp user to register (just email)
    // if they are signed in, I know which user has access to these vids

}
