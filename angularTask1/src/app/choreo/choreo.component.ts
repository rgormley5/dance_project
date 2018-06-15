import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-choreo',
  templateUrl: './choreo.component.html',
  styleUrls: ['./choreo.component.css']
})
export class ChoreoComponent implements OnInit {

  constructor(
    private _service: ServiceService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  itemAdded: boolean;
  itemExists: boolean;
  shouldCheckCart: boolean;
  item: any;

  ngOnInit() {
    this.itemAdded = false;
    this.itemExists = false;
  }

  cartItemClicked(itemID) {
    console.log("cart item clicked");
    console.log("itemID.value is: ", itemID);

    if (itemID === "1") {
      this.item = {
        item_ID: itemID,
        title: "Perfect by Ed Sheeran and Beyonce",
        level: "Hard",
        style: "Slow Dance",
        desc: "Slow, Romantic, Flowy"
      }
    };
    if (itemID === "2") {
      this.item = {
        item_ID: itemID,
        title: "The Way You Look Tonight by Frank Sinatra",
        level: "Medium",
        style: "Fox Trot",
        desc: "Classy, Formal"
      }
    };
    if (itemID === "3") {
      this.item = {
        item_ID: itemID,
        title: "Over and Over Again by Nathan Sykes and Ariana Grande",
        level: "TBA",
        style: "Slow Dance",
        desc: "Casual, Romantic"
      }
    };
    if (itemID === "4") {
      this.item = {
        item_ID: itemID,
        title: "Marry Me by Train",
        level: "TBA",
        style: "Rumba",
        desc: "TBA"
      }
    };
    if (itemID === "5") {
      this.item = {
        item_ID: itemID,
        title: "Thousand Years by Christina Perry",
        level: "TBA",
        style: "Waltz",
        desc: "TBA"
      }
    };
    if (itemID === "6") {
      this.item = {
        item_ID: itemID,
        title: "You and Me by Lifehouse",
        level: "TBA",
        style: "Waltz",
        desc: "TBA"
      }
    };
    if (itemID === "7") {
      this.item = {
        item_ID: itemID,
        title: "You Are the Best Thing by Ray Lamontagne",
        level: "TBA",
        style: "Foxy",
        desc: "TBA"
      }
    };
    if (itemID === "8") {
      this.item = {
        item_ID: itemID,
        title: "Beautiful in White by Matt Johnson",
        level: "TBA",
        style: "TBA",
        desc: "Classy, Formal"
      }
    };
    if (itemID === "9") {
      this.item = {
        item_ID: itemID,
        title: "Stay with You by John Legend",
        level: "TBA",
        style: "Foxy",
        desc: "TBA"
      }
    };
    if (itemID === "10") {
      this.item = {
        item_ID: itemID,
        title: "The Sweetest Love by Robin Thicke",
        level: "TBA",
        style: "Foxy",
        desc: "TBA"
      }
    };
    if (itemID === "11") {
      this.item = {
        item_ID: itemID,
        title: "Can’t Help Falling In Love by Elvis Presley",
        level: "TBA",
        style: "Foxy",
        desc: "TBA"
      }
    };

    this._service.addItemToNonUserCart(this.item);

    if (this._service.cartArr.length > 0) {
      this._service.cartPageShowTotal = true;
    }

    if (this._service.cartItemExists !== true) {
        this.itemAdded = true;
        this.itemExists = false;
      } else {
        this.ngOnInit();
        this.itemExists = true;
    }

    // obs.subscribe(data => {
    //   console.log("cart item data: ", data)
    // })
  }

  itemAddedClose() {
    this.itemAdded = false;
    this.ngOnInit();
  }

}
