import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-simple-experience',
  templateUrl: './simple-experience.component.html',
  styleUrls: ['./simple-experience.component.css']
})
export class SimpleExperienceComponent implements OnInit {

  constructor(public dataService: DataService) { }

  data: Object[];

  ngOnInit() {
    this.data = this.dataService.getSkills();
    console.log(this.data);
  }

}
