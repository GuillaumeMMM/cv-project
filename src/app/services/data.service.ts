import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  skillsData: Object[] = [];
  colorCodes: Object[] = [];

  constructor() {
    this.skillsData = [
      {
        job: "Consultant Technique IBM",
        detail: "Je participe à des projets IoT en tant que consultant technique. Je crée des applications web (Angular, React, HTML/CSS, Typescript, Bootstrap,...), j'analyse des données (R, SPSS, Datascience Experience,...), que je visualise ensuite (D3.js, SVG,...).",
        dates: "Nov. 2017 - Auj.",
        img: "../../../../assets/images/ibm_logo.png",
        skills: [
          {
          name: "Web Design",
          type: "Design",
          size: 30,
        },
        {
          name: "HTML/CSS/Javascript",
          type: "Developpement",
          size: 50,
        },
        {
          name: "IBM Cloud",
          type: "Autre",
          size: 40,
        },
        {
          name: "Angular 4",
          type: "Developpement",
          size: 60,
        },
        {
          name: "R",
          type: "Data Science",
          size: 45,
        },
        {
          name: "Watson Studio/DSX",
          type: "Data Science",
          size: 40,
        }
        ]
      },
      {
        job: "Stagiaire IoT IBM",
        detail: "Dans le cadre de missions de conseil et développement de solutions faisant appel aux logiciels internet of thing d'IBM, j'étais intégré dans l'équipe de projet de clients d'IBM et j'ai été amené à épauler des consultants dans leurs missions. J'ai élaboré des propositions commerciales IoT, préparé et analysé des ateliers de design thinking dans le cadre d'applications de visualisation, et j'ai participé à un projet IoT dans l'industrie 4.0.",
        dates: "Fev. 2017 - Aout 2017",
        img: "../../../../assets/images/ibm_logo.png",
        skills: [{
          name: "Web Design",
          type: "Design",
          size: 30,
        },
        {
          name: "Architecture IoT",
          type: "Autre",
          size: 30,
        }, {
          name: "R",
          type: "Data Science",
          size: 60,
        }
          , {
          name: "Design Thinking",
          type: "Design",
          size: 50,
        }]
      },
      {
        job: "Projet plateforme IoT",
        detail: "J'ai réalisé un état de l’art des technologies de l’IoT, des protocoles les plus importants, et en particulier des protocoles de routage (RPL, LIBP). J'ai participé à la mise en place d’un réseau de capteurs intelligents pour étudier ces protocoles de routage et tester les effets de modification des protocoles dans des conditions particulières.",
        dates:"Sept. 2016 - Jan. 2017",
        img: "../../../../assets/images/tsp.png",
        skills: [{
          name: "Architecture IoT",
          type: "Autre",
          size: 30,
        }, {
          name: "Contiki OS",
          type: "Developpement",
          size: 40,
        }
          , {
          name: "C",
          type: "Developpement",
          size: 30,
        }, {
          name: "LaTeX",
          type: "Design",
          size: 40,
        }]
      },
      {
        job: "Society for Social Psychiatry",
        detail: "J'ai été bénévole pour l'ONG Society for Social Psychiatry and Mental Health en Grèce. J'ai développé  un site web et renouvelé la charte graphique de l'association via la créations de logos, d'illustrations...",
        dates:"Juil. 2016 - Sept. 2016",
        img: "../../../../assets/images/sfsp.png",
        skills: [{
          name: "Photoshop",
          type: "Design",
          size: 60,
        }, {
          name: "Web Design",
          type: "Design",
          size: 30,
        }, {
          name: "Wordpress",
          type: "Developpement",
          size: 30,
        }]
      }
    ];


    this.colorCodes = [
      { type: "Developpement", color: "#B0C4DE", checked: true },
      { type: "Design", color: "#F5C9B5", checked: true },
      { type: "Data Science", color: "#35617C", checked: true },
      { type: "Autre", color: "#CE889C", checked: true },
    ];

  }


  getSkills() {
    return this.skillsData;
  }

  getTypes() {
    return this.colorCodes;
  }

  getColorFromType(type: string) {
    for (let i = 0; i < this.colorCodes.length; i++) {
      if (this.colorCodes[i]["type"] === type) {
        return this.colorCodes[i]["color"];
      }
    }
    return "#CE889C";
  }

}
