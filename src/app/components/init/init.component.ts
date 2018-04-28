import { Component, OnInit } from '@angular/core';

import * as d3 from "d3";


@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {

  width: number = 2400;
  height: number = 1200;
  margin = { left: 0, right: 0, top: 0, bottom: 0 };
  mainGroup: d3;

  constructor() { }

  ngOnInit() {
    //Set menu active color
    document.getElementById("menu-item-accueil").style.color="black";

    this.height = window.innerHeight;
    this.width = window.innerWidth * 3;

    //  Create a responsive wrapper
    var svg = d3.select("#wrapper")
      .append("svg")
      .attr("id", "main-svg")
      .attr("viewBox", "0 0 " + (this.width + 20) + " " + (this.height + 80));

    var mainGroup:d3 = svg.append("g");
      
    this.mainGroup = mainGroup;

    this.onClick();

    //On click anywhere, execute onHover function
    document.addEventListener('click',() => this.onClick(), true);
  }

  onClick() {
    //Profile
    var width = this.width
    var height = this.height

    d3.selectAll(".header-circle")
    .transition().duration(600)
    .attr("r",0)
    .remove();

    var rayon:number = 40;
    var color1:string = this.getRandomColor();
    var color2:string = this.getRandomColor();

    for(let i=0;i<15;i++){
      this.mainGroup.append("circle")
      .attr("r",0)
      .attr("cx",this.getRandomXPos(width,rayon)+"px")
      .attr("cy",this.getRandomYPos(height,rayon)+"px")
      .attr("fill",function(){if(i>15/2){return color1;}else{return color2;}})
      .attr("class","header-circle")
      .attr("fill-opacity",0.7)
      .transition().duration(800)
      .attr("r",rayon);
    }

  }

  getRandomXPos(width,rayon){
    return Math.random()*(width-2*rayon)+rayon;
  }
  getRandomYPos(height,rayon){
    return Math.random()*(height-2*rayon)+rayon;
  }
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
