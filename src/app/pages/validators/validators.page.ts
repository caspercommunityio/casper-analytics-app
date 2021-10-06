import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CasperService } from '../../api/casper.service';
import { MenuController } from '@ionic/angular';

declare var google;

import { NgxSpinnerService } from "ngx-spinner";
import { SelectionType } from '@swimlane/ngx-datatable';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Platform } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { environment } from '../../../environments/environment'

import { SwiperOptions } from 'swiper';


@Component({
  selector: 'app-validators',
  templateUrl: './validators.page.html',
  styleUrls: ['./validators.page.scss'],
})
export class ValidatorsPage implements OnInit {
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  validators: any;
  rows: any = undefined;
  holdersRows: any = undefined;
  holdersPage: any = {
    size: 0,
    totalElements: 0,
    totalPages: 0,
    pageNumber: 0
  }
  columns: any;

  selectionType = SelectionType.single;
  casperEnvironment: any = this.casper.getCasperEnvironment();

  ios: boolean;
  android: boolean;

  favorites: any

  contactUsUrl: any = environment.contactUsUrl;

  slideSupplyOptions: SwiperOptions = {
    slidesPerView: 3,
    loop: false,
    observer: true,
    observeParents: true,
    watchSlidesVisibility: true,
    breakpoints: {
      1: { slidesPerView: 1.1, spaceBetween: 0 },
      540: { slidesPerView: 1.1, spaceBetween: 0 },
      720: { slidesPerView: 2.1, spaceBetween: 0 },
      960: { slidesPerView: 3, spaceBetween: 0 }
    }
  };
  slideInfosOptions: SwiperOptions = {
    slidesPerView: 4,
    loop: false,
    observer: true,
    observeParents: true,
    watchSlidesVisibility: true,
    breakpoints: {
      1: { slidesPerView: 1.1, spaceBetween: 0 },
      540: { slidesPerView: 1.1, spaceBetween: 0 },
      720: { slidesPerView: 2.1, spaceBetween: 0 },
      960: { slidesPerView: 3.1, spaceBetween: 0 },
      1250: { slidesPerView: 4.1, spaceBetween: 0 }
    }
  };

  globalsCharts: any;

  selectedTab: String = 'validators';
  searchHolder: String = '';

  validatorsSubscription: any = undefined;
  validatorsChartsSubscription: any = undefined;
  holdersSubscription: any = undefined;


  constructor(private casper: CasperService, private router: Router, private menuController: MenuController, private spinner: NgxSpinnerService, private platform: Platform) {
    this.ios = platform.is('ios');
    this.android = platform.is('android');
  }

  getHolders(pageInfo) {
    this.holdersPage.pageNumber = pageInfo.offset;
    this.holdersSubscription = this.casper.getHoldersList((this.holdersPage.pageNumber + 1), this.searchHolder).subscribe((pageData: any) => {
      this.holdersRows = pageData.data;
      this.holdersPage = {
        size: 50,
        totalElements: pageData.pagination.totalHolders,
        totalPages: pageData.pagination.totalPages,
        pageNumber: this.holdersPage.pageNumber
      }
    });
  }



  changeEnvironment(event) {
    this.casper.setCasperEnvironment(this.casperEnvironment);
    this.validators = [];
    this.ngOnInit();
  }

  async ngOnInit() {
    this.getHolders({ offset: 0 });
    this.menuController.enable(false);
    this.spinner.show();
    let favorites: any = await Storage.get({ key: 'favorites' });
    if (favorites.value !== null) {
      this.favorites = JSON.parse(favorites.value)[this.casperEnvironment];
    } else {
      this.favorites = [];
    }
    if (this.validatorsSubscription !== undefined) {
      this.validatorsSubscription.unsubscribe();
    }
    this.validatorsSubscription = this.casper.getAllValidators().subscribe((validators: any) => {
      this.validators = validators;
      let validatorsInfo: any = [];
      for (const key in this.validators.validators) {
        validatorsInfo.push({
          position: this.validators.validators[key].currentPosition,
          CSPRStaked: this.validators.validators[key].currentCsprStaked,
          publicKey: this.validators.validators[key].publicKey,
          fees: this.validators.validators[key].currentDelegationRate,
          delegators: this.validators.validators[key].currentDelegators,
          APY: this.validators.validators[key].previousAPY,
          delegators7d: this.validators.validators[key].totalDelegatorsLastWeek,
          delegations7d: this.validators.validators[key].totalDelegateLastWeek,
          icon: this.validators.validators[key].icon,
          name: this.validators.validators[key].name,
          undelegations7d: this.validators.validators[key].totalUndelegateLastWeek
        })
      }
      this.rows = validatorsInfo;
      this.initMap();
      this.spinner.hide();
    });

    this.validatorsChartsSubscription = this.casper.getGlobalCharts().subscribe((data) => {
      this.globalsCharts = data;
    });
  }

  selectValidator(event: any) {
    this.router.navigateByUrl("/dashboard/" + event.selected[0].publicKey);
  }

  filterValidatorsList(event: any) {
    let keys = Object.keys(this.validators.validators);

    let filtered = keys.filter(x => x.toUpperCase().indexOf(event.detail.value.toUpperCase()) >= 0);
    if (event.detail.value == "") {
      filtered = keys;
    }
    let validatorsInfo: any = [];
    filtered.map(key => {
      validatorsInfo.push({
        position: this.validators.validators[key].currentPosition,
        CSPRStaked: this.validators.validators[key].currentCsprStaked,
        publicKey: this.validators.validators[key].publicKey,
        fees: this.validators.validators[key].currentDelegationRate,
        delegators: this.validators.validators[key].currentDelegators,
        APY: this.validators.validators[key].previousAPY,
        delegators7d: this.validators.validators[key].totalDelegatorsLastWeek,
        delegations7d: this.validators.validators[key].totalDelegateLastWeek,
        undelegations7d: this.validators.validators[key].totalUndelegateLastWeek,
        icon: this.validators.validators[key].icon,
        name: this.validators.validators[key].name
      })
    })

    this.rows = validatorsInfo;
  }
  filterHoldersList(event: any) {
    this.searchHolder = event.detail.value;
    this.getHolders({ offset: 0 });

  }

  initMap() {

    var pinSVGHole = "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";
    var labelOriginHole = new google.maps.Point(12, 15);
    var markerImageRed = {
      path: pinSVGHole,
      anchor: new google.maps.Point(12, 17),
      fillOpacity: 1,
      fillColor: "#e74c3c",
      strokeWeight: 2,
      strokeColor: "white",
      scale: 2,
      labelOrigin: labelOriginHole
    };

    let latLng = new google.maps.LatLng(50.8503396, 4.3517103);
    let mapOptions = {
      center: latLng,
      zoom: 2,
      mapId: environment.mapId
    }

    let infowindow = new google.maps.InfoWindow();


    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    for (const key in this.validators.localisations) {

      let latLng = new google.maps.LatLng(this.validators.localisations[key].latitude, this.validators.localisations[key].longitude);

      const marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        icon: markerImageRed
      });

      google.maps.event.addListener(marker, 'click', (function(marker, localisation) {
        return function() {
          var html = "";
          localisation.validators.map(x => {
            html += '<a href="/dashboard/' + x.publicKey + '\" target="_self\">#' + x.position + ' - ' + x.publicKey + '</a><br>';
          });

          infowindow.setContent(html);
          infowindow.open(this.map, marker);
        }
      })(marker, this.validators.localisations[key]));
    }

  }

  ngOnDestroy() {
    if (this.validatorsSubscription !== undefined) {
      this.validatorsSubscription.unsubscribe();
    }
    if (this.validatorsChartsSubscription !== undefined) {
      this.validatorsChartsSubscription.unsubscribe();
    }
  }

}
