import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CasperService } from '../../api/casper.service';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { SwiperOptions } from 'swiper';

declare var google;
@Component({
  selector: 'app-infos',
  templateUrl: './infos.page.html',
  styleUrls: ['./infos.page.scss'],
})
export class InfosPage implements OnInit {
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map: any;
  public validator: String;
  public validatorInfos: any = undefined;
  public validatorSubscription = undefined;

  slideOptions: SwiperOptions = {
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

  constructor(public activatedRoute: ActivatedRoute, public casper: CasperService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.validator = this.activatedRoute.snapshot.paramMap.get('validator');
    this.spinner.show();
    this.validatorSubscription = this.casper.getValidatorInfos(this.validator).subscribe(data => {
      this.validatorInfos = data;
      this.initMap();
      this.spinner.hide();
    });

  }


  initMap() {
    // Pick your pin (hole or no hole)
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

    var markerImageGreen = {
      path: pinSVGHole,
      anchor: new google.maps.Point(12, 17),
      fillOpacity: 1,
      fillColor: "#2ecc71",
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

    if (this.validatorInfos['contract-info'] && this.validatorInfos['contract-info'].owner.location) {
      let latLng = new google.maps.LatLng(this.validatorInfos['contract-info'].owner.location.latitude, this.validatorInfos['contract-info'].owner.location.longitude);


      const marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        icon: markerImageRed
      });

      google.maps.event.addListener(marker, 'click', (function(marker, location) {
        return function() {
          var html = "";
          html += 'Owner Location - ' + location.name;
          infowindow.setContent(html);
          infowindow.open(this.map, marker);
        }
      })(marker, this.validatorInfos['contract-info'].owner.location));
    }

    if (this.validatorInfos['contract-info'] && this.validatorInfos['contract-info'].nodes) {
      this.validatorInfos['contract-info'].nodes.map(node => {
        let latLng = new google.maps.LatLng(node.location.latitude, node.location.longitude);
        const marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          icon: markerImageGreen
        });
        google.maps.event.addListener(marker, 'click', (function(marker, location) {
          return function() {
            var html = "";
            html += 'Node Location - ' + location.name;
            infowindow.setContent(html);
            infowindow.open(this.map, marker);
          }
        })(marker, node.location));
      })
    }


  }

  ngOnDestroy() {
    if (this.validatorSubscription) {
      this.validatorSubscription.unsubscribe();
    }
  }

  getImateSrc(images) {
    if (images.svg != "") {
      return images.svg;
    } else if (images.png_256 != "") {
      return images.png_256;
    } else if (images.png_1024 != "")
      return images.png_1024;
  }

}
