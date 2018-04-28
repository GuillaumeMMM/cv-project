import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    document.getElementById("menu-item-projets").style.color="black";
  }

}
