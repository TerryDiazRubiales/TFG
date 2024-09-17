import { Component, OnInit } from '@angular/core';
import { pjServices } from '../../services/pj.service';

@Component({
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.css']
})
export class RankingPageComponent {

  constructor( private pjServices : pjServices,

  ) { }

  ranking: any;

  ngOnInit(): void {

    this.pjServices.getRanking()

    

  }

}
