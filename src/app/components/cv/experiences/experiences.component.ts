import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../services/data.service";
import * as d3 from "d3";

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent implements OnInit {

  width: number = 1000;
  height: number = 400;
  margin = { left: 0, right: 0, top: 0, bottom: 0 };
  svg: d3;
  color1: string = "#B0C4DE"; //bleu clair

  jobs: Object[];
  selectedJobID: string = "Consultant Technique IBM";
  selectedJobDetail: string = "";
  selectedJobDates: string = "";

  drawnCircles: boolean = false;


  constructor(public dataService: DataService) {
  }

  ngOnInit() {
    var width = this.width;
    var height = this.height;

    //Container definition
    var svg = d3.select("#skills-circles")
      .append("svg")
      .attr("id", "main-svg")
      .attr("viewBox", "0 0 " + this.width + " " + 300);

    var svgTimeline = d3.select("#timeline")
      .append("svg")
      .attr("id", "timeline-svg")
      .attr("viewBox", "0 0 " + this.width + " " + 120);

    var g = svg.append("g")
      .attr("id", "main-g")
      .attr("transform", "translate(" + this.margin.left + "," + (this.margin.top) + ")");

    //get the data
    var data = this.dataService.getSkills()[0]["skills"];
    this.jobs = this.dataService.getSkills();

    var dataService = this.dataService;

    var selectedJobID = this.selectedJobID;
    var selectedJobDetail = this.dataService.getSkills().filter((obj) => {
      if (obj["job"] === selectedJobID) {
        return 1;
      } else {
        return 0;
      }
    })[0]["detail"];

    var selectedJobDates = this.dataService.getSkills().filter((obj) => {
      if (obj["job"] === selectedJobID) {
        return 1;
      } else {
        return 0;
      }
    })[0]["dates"];

    this.selectedJobDetail = selectedJobDetail;
    this.selectedJobDates = selectedJobDates;


    //Drawtimeline
    (() => {
      var timeLine = svgTimeline.append("rect")
        .attr("width", this.width * 0.8)
        .attr("height", "2px")
        .attr("fill", "#35617C")
        .attr("x", this.width * 0.1)
        .attr("y", "70px");

      var arrow = svgTimeline.append("path")
        .attr("fill", "#35617C")
        .attr("d", 'M ' + (0.9 * this.width - 7) + ',66 L ' + (0.9 * this.width + 7) + ',71 L ' + (0.9 * this.width - 7) + ',76');

      var jobsCircles = svgTimeline.selectAll(".jobs-circles")
        .data(JSON.parse(JSON.stringify(this.dataService.getSkills())).reverse())
        .enter()
        .append("circle")
        .attr("class", "jobs-circles")
        .attr("cx", function (d, i) {
          return width * 0.15 + i * (1.1 * width / (data.length - 1));
        })
        .attr("cy", "71px")
        .attr("fill", "#35617C")
        .attr("r", 10)
        .on("mouseover", function (d, i) {
          d3.select("#jobs-titles-" + i).transition().duration(300).attr("fill", "#000");
        })
        .on("mouseout", function (d, i) {
          d3.select("#jobs-titles-" + i).transition().duration(300).attr("fill", "#777");
        });

      var invisibleBlueCircle = svgTimeline.selectAll(".invisible-jobs-circles")
        .data(JSON.parse(JSON.stringify(this.dataService.getSkills())).reverse())
        .enter()
        .append("circle")
        .attr("class", "invisible-jobs-circles")
        .attr("id", function (d, i) { return "invisible-circles-" + i })
        .attr("cx", function (d, i) {
          return width * 0.15 + i * (1.1 * width / (data.length - 1));
        })
        .attr("cy", "71px")
        .attr("fill", "#35617C")
        .attr("r", function (d, i) {
          if (d["job"] === selectedJobID) { return 14; } return 0;
        });

      var invisibleGreyCircle = svgTimeline.selectAll(".invisible-grey-jobs-circles")
        .data(JSON.parse(JSON.stringify(this.dataService.getSkills())).reverse())
        .enter()
        .append("circle")
        .attr("class", "invisible-grey-jobs-circles")
        .attr("id", function (d, i) { return "invisible-grey-circles-" + i })
        .attr("cx", function (d, i) {
          return width * 0.15 + i * (1.1 * width / (data.length - 1));
        })
        .attr("cy", "71px")
        .attr("fill", "#f4f4f4")
        .attr("r", function (d, i) {
          if (d["job"] === selectedJobID) { return 9; } return 0;
        });

      var invisibleFrontCirlce = svgTimeline.selectAll(".invisible-front-circles")
        .data(JSON.parse(JSON.stringify(this.dataService.getSkills())).reverse())
        .enter()
        .append("circle")
        .attr("class", "invisible-front-circles")
        .attr("id", function (d, i) { return "invisible-front-circles-" + i })
        .attr("cx", function (d, i) {
          return width * 0.15 + i * (1.1 * width / (data.length - 1));
        })
        .attr("cy", "71px")
        .attr("r", 20)
        .attr("fill-opacity", 0)
        .on("mouseover", function (d, i) {
          if (d["job"] != selectedJobID) {
            d3.select("#invisible-grey-circles-" + i).attr("visibility", "visible")
              .transition()
              .duration(400)
              .attr("r", 9);
            d3.select("#invisible-circles-" + i).attr("visibility", "visible")
              .transition()
              .duration(400)
              .attr("r", 14);
            d3.select("#jobs-titles-" + i).transition().duration(400).attr("fill", "#000");
          }
        })
        .on("mouseout", function (d, i) {
          if (d["job"] != selectedJobID) {
            d3.select("#invisible-grey-circles-" + i).attr("visibility", "visible")
              .transition()
              .duration(400)
              .attr("r", 0);
            d3.select("#invisible-circles-" + i)
              .transition()
              .duration(400)
              .attr("r", 0);
            d3.select("#jobs-titles-" + i).transition().duration(400).attr("fill", "#777");
          }
        })
        .on("click", (d, i) => {
          d3.selectAll(".invisible-grey-jobs-circles").attr("visibility", "visible")
            .transition()
            .duration(400)
            .attr("r", 0);
          d3.selectAll(".invisible-jobs-circles")
            .transition()
            .duration(400)
            .attr("r", 0);
          d3.selectAll(".jobs-titles").transition().duration(400).attr("fill", "#777");

          selectedJobID = d["job"];
          selectedJobDetail = d["detail"];
          selectedJobDates = d["dates"];
          this.selectedJobID = selectedJobID;
          this.selectedJobDetail = selectedJobDetail;
          this.selectedJobDates = selectedJobDates;

          var newData = this.dataService.getSkills().filter((obj)=>{
            if(obj["job"]===selectedJobID){return 1;}else{return 0;}
          })[0]["skills"];
          drawSkills(updateCategories(newData, categoriesData));

          data = newData;

          d3.select("#invisible-grey-circles-" + i).attr("visibility", "visible")
            .transition()
            .duration(400)
            .attr("r", 9);
          d3.select("#invisible-circles-" + i)
            .transition()
            .duration(400)
            .attr("r", 14);
          d3.select("#jobs-titles-" + i).transition().duration(400).attr("fill", "#000");
        });

      var jobsTitles = svgTimeline.selectAll(".jobs-titles")
        .data(JSON.parse(JSON.stringify(this.dataService.getSkills())).reverse())
        .enter()
        .append("text")
        .attr("class", "jobs-titles")
        .attr("id", function (d, i) { return "jobs-titles-" + i })
        .attr("text-anchor", "middle")
        .attr("fill", function (d, i) {
          if (d["job"] === selectedJobID) { return "#000"; } return "#777";
        })
        .attr("x", function (d, i) {
          return width * 0.15 + i * (1.1 * width / (data.length - 1));
        })
        .text(function (d, i) { return d.job })
        .attr("y", "50px")
        .on("mouseover", function (d, i) {
          if (d["job"] != selectedJobID) {
            d3.select(this).transition().duration(300).attr("fill", "#000");
            d3.select("#invisible-grey-circles-" + i).attr("visibility", "visible")
              .transition()
              .duration(400)
              .attr("r", 9);
            d3.select("#invisible-circles-" + i).attr("visibility", "visible")
              .transition()
              .duration(400)
              .attr("r", 14);
          }
        })
        .on("mouseout", function (d, i) {
          if (d["job"] != selectedJobID) {
            d3.select(this).transition().duration(300).attr("fill", "#777");
            d3.select("#invisible-grey-circles-" + i)
              .transition()
              .duration(400)
              .attr("r", 0);
            d3.select("#invisible-circles-" + i)
              .transition()
              .duration(400)
              .attr("r", 0);
          }
        }).on("click", (d, i) => {
          d3.selectAll(".invisible-grey-jobs-circles").attr("visibility", "visible")
            .transition()
            .duration(400)
            .attr("r", 0);
          d3.selectAll(".invisible-jobs-circles")
            .transition()
            .duration(400)
            .attr("r", 0);
          d3.selectAll(".jobs-titles").transition().duration(400).attr("fill", "#777");

          selectedJobID = d["job"]
          selectedJobDetail = d["detail"];
          selectedJobDates = d["dates"];
          this.selectedJobID = selectedJobID;
          this.selectedJobDetail = selectedJobDetail;
          this.selectedJobDates = selectedJobDates;

          d3.select("#invisible-grey-circles-" + i).attr("visibility", "visible")
            .transition()
            .duration(400)
            .attr("r", 9);
          d3.select("#invisible-circles-" + i)
            .transition()
            .duration(400)
            .attr("r", 14);
          d3.select("#jobs-titles-" + i).transition().duration(400).attr("fill", "#000");
        });

    })();



    //Get the max size for text display
    var maxSize: number = 0;
    for (let i = 0; i < data.length; i++) {
      maxSize = Math.max(data[i]["size"], maxSize);
    }

    var drawSkills = function (data: Object[]) {
      d3.select("#main-g").selectAll(".skill-circle")
        .transition().duration(500).attr("r", 0)
        .remove();
      d3.select("#main-g").selectAll(".skill-text").remove();

      //Define variables dor circles drawing
      var circlesSpread: number = 170;
      var circlesSize: number = 1.1;
      //console.log(data.length);
      if (data.length > 0) {
        var circlesWidth: number = (data.length - 1) * circlesSpread + (data[0]["size"] + data[data.length - 1]["size"]) * circlesSize / 2;
      }

      //Draw the circles
      var circles = g.selectAll("circles")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "skill-circle")
        .attr("id", function (d, i) { return "skill-circle-" + i })
        .attr("cx", function (d, i) {
          return circlesSpread * i + (width - circlesWidth) / 2
        })
        .attr("cy", 100)
        .attr("fill", function (d, i) { return dataService.getColorFromType(d.type) })
        .attr("fill-opacity", 0.9)
        .attr("r", 0).transition().duration(500)
        .attr("r", function (d, i) {
          return d.size * circlesSize;
        });

      //draw text
      var textes = g.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("id", function (d, i) { return "skill-title-" + i })
        .attr("class", "skill-text")
        .attr("x", function (d, i) {
          return circlesSpread * i + (width - circlesWidth) / 2
        })
        .attr("y", function (d, i) { return 2 * maxSize + 80 })
        .attr("text-anchor", "middle")
        .text(function (d, i) {
          return d.name;
        }).transition().duration(500).attr("fill-opacity", 1);
    }



    //draw categories skills
    var updateCategories = function (data, categories) {
      var newData: Object[] = data.filter((obj) => {
        for (let i = 0; i < categories.length; i++) {
          if (obj["type"] === categories[i]["type"]) {
            return categories[i]["checked"];
          }
        }
      });
      return newData;
    }

    var categoriesData = this.dataService.getTypes();
    var categoriesCirclesSpread: number = 50;
    var categoriesCirclesSize: number = 12;
    drawSkills(updateCategories(data, categoriesData));

    //create group
    var catGroup = svg.append("g")
      .attr("id", "categories-group")
      .attr("transform", "translate(" + this.margin.left + "," + (this.margin.top + 250) + ")");

    var legendCirclesWidth: number = (categoriesData.length - 1) * categoriesCirclesSpread + 2 * categoriesCirclesSize;

    //draw the main circles
    (() => {

      var circleType = catGroup.selectAll(".circle-type")
        .data(categoriesData)
        .enter()
        .append("circle")
        .attr("class", "circle-type")
        .attr("r", categoriesCirclesSize)
        .attr("cx", function (d, i) {
          return categoriesCirclesSpread * i + (width - legendCirclesWidth) / 2
        })
        .attr("fill", function (d, i) { return d.color })
        .attr("fill-opacity", 0.6)

      //draw the inner circles
      var innerCircleType = catGroup.selectAll(".inner-circle-type")
        .data(categoriesData)
        .enter()
        .append("circle")
        .attr("id", function (d, i) { return "inner-circle-" + i })
        .attr("class", "inner-circle-type")
        .attr("r", 8)
        .attr("cx", function (d, i) {
          return categoriesCirclesSpread * i + (width - legendCirclesWidth) / 2
        })
        .attr("cy", 0)
        .attr("fill-opacity", function (d) {
          if (!d.checked) {
            return 0;
          }
          return 1;
        })
        .attr("fill", function (d, i) { return d.color });

      var legendText = catGroup.selectAll("text")
        .data(categoriesData)
        .enter()
        .append("text")
        .attr("id", function (d, i) { return "text-legend-" + i })
        .attr("x", function (d, i) {
          return categoriesCirclesSpread * i + (width - legendCirclesWidth) / 2
        })
        .attr("text-anchor", "middle")
        .attr("y", "50px")
        .attr("visibility", "hidden")
        .text(function (d) {
          return d.type
        });

      d3.select("#categories-group").selectAll(".inner-circle-type")
        .on("mouseover", function () {
          d3.select(this).attr("fill-opacity", function (d, i) {
            if (d.checked) { return 0 }
            else { return 1 };
          });
          d3.select("#text-legend-" + this.id.substring(this.id.length - 1)).attr("visibility", "visible");
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill-opacity", function (d, i) {
            if (d.checked) { return 1 }
            else { return 0 };
          });
          d3.select("#text-legend-" + this.id.substring(this.id.length - 1)).attr("visibility", "hidden");
        })
        .on("click", function () {
          categoriesData[this.id.substring(this.id.length - 1)]["checked"] = !categoriesData[this.id.substring(this.id.length - 1)]["checked"];
          var newData: Object[] = updateCategories(data, categoriesData);
          drawSkills(newData);
        });
    })();
  }
}