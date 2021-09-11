import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { GlobalConstants } from '../../common/global-constants';

@Component({
  selector: 'app-images-form',
  templateUrl: './images-form.component.html',
  styleUrls: ['./images-form.component.scss']
})
export class ImagesFormComponent implements OnInit {

  files: any[];
  apartId: string;
  imageForm: FormGroup;
  constructor( private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.imageForm = new FormGroup({
      gallery: new FormControl()
    });
  }

  onfiles(event) {
    if (localStorage.getItem('apartId')) {
      this.apartId = localStorage.getItem('apartId');
    }
    this.files = event.target.files;
  }

  onSubmit() {
    let j = 0;
    for (let i = 0; i < this.files.length; i++) {
      const fd = new FormData();
      const splitName = this.files[i].name.split('.');
      const ext = splitName[splitName.length - 1];
      fd.append('gallery[]', this.files[i], `${this.apartId}-${i}.${ext}`);
      const request = new XMLHttpRequest();
      // http://db-services.web/apart
      // 'https://db-services.incoloria.com/apart'
      request.open('POST', GlobalConstants.apiURL + '/apart');
      request.upload.onprogress = (e: ProgressEvent) => {
        if (e.lengthComputable) {
          const progress = document.querySelector(`#progress-${i}`);
          const percentage = document.querySelector(`#percentage-${i}`);
          percentage.innerHTML = String(Math.floor((e.loaded / e.total) * 100 )) + '%';
          progress.setAttribute('max', `${e.total}`);
          progress.setAttribute('value', `${e.loaded}`);
        }
      };
      request.responseType = 'json';
      request.onload = () => {
        if (request.readyState === request.DONE) {
          j++;
          if (j === this.files.length) {
            // this.router.navigate(['add'], {relativeTo: this.route.parent}).then( () => {
            //     localStorage.removeItem('apartId');
            // });
          }
        }
      };
      request.send(fd);
    }// End For loop
  }

  onReset() {
    this.files = [];
  }

}
