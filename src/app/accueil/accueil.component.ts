import {Component, OnInit} from '@angular/core';
import {ListPersonnelService, Music} from "../partage/service/list-personnel.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  music: Music = {};

  constructor(private readonly listPersonnelService: ListPersonnelService) {}

  ngOnInit(): void {
    this.random();
  }

  random() {
    this.listPersonnelService.fetchRandom().subscribe(music => {
      this.music = music;
    });
  }

  delete(person: Music) {
    this.listPersonnelService.delete(person.id!).subscribe(personnel => {
      this.random();
    });
  }
}
