import { Component, OnInit } from '@angular/core';
import {Paired} from '../../shared/types/paired';
import {City} from '../../shared/types/city';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalConstants} from '../../common/global-constants';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {

  periods: Paired[];
  properties: Paired[];
  cities: City[];
  coordinates: {lat: number, lng: number};
  rentalMode = false;
  form: FormGroup;
  constructor(private http: HttpClient, private route: ActivatedRoute , private router: Router) { }

  ngOnInit(): void {
    // this.http.get('https://db-services.incoloria.com/apart').subscribe( (aparts: any[]) => {
    //   this.aparts = aparts;
    // })

    this.http.get<Paired[]>(GlobalConstants.apiURL + '/period').subscribe( periods => {
      this.periods = periods;
    });

    this.http.get<Paired[]>(GlobalConstants.apiURL + '/property').subscribe( properties => {
      this.properties = properties;
    });

    this.http.get<City[]>(GlobalConstants.apiURL + '/city').subscribe( cities => {
      this.cities = cities;
    });


    if ( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition( position => {
        this.form.get('location').setValue(position.coords.latitude + ',' + position.coords.longitude);
        // this.coordinates.lat = position.coords.latitude;
        // this.coordinates.lng = position.coords.longitude;
        // console.log(position);
      }, () => {
        this.form.get('location').setValue(false);
      });
    }
    this.form = new FormGroup({
      action: new FormControl(1),
      price: new FormControl(null),
      period: new FormControl(1),
      property: new FormControl(1),
      city: new FormControl(1),
      surface: new FormControl(null),
      pieces: new FormControl(null),
      rooms: new FormControl(null),
      floors: new FormControl(null),
      location: new FormControl(null),
      address: new FormControl(null),
      description: new FormControl(null),
      external: new FormControl(null),
      internal: new FormControl(null),
      conditions: new FormControl(null)
    });
  }

  changeMode() {
    this.rentalMode = !this.rentalMode;
    if (!this.rentalMode) {
      // this.form.get('period').setValue(0);
    } else {
      // this.form.get('period').setValue(1);
    }
  }

  onSubmit() {
    // console.log(this.route.parent);
    // return;
    // for (const file of inputFiles.files) {
    //     fd.append('files[]', file, file.name);
    // }
    // 'http://db-services.web/apart'
    // 'https://db-services.incoloria.com/apart'
    // 'application/x-www-form-urlencoded'
    this.http.post<{affected: string, id: string}>(GlobalConstants.apiURL + '/apart', this.form.value, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe((response) => {
      localStorage.setItem('apartId', response.id);
      this.router.navigate(['images'], {relativeTo: this.route.parent});
    });
  }

}
