import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ListPersonnelService, Music } from "../../partage/service/list-personnel.service";

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent implements OnInit {

  music: Music;

  /**
   * Component constructor
   */
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly listPersonnelService: ListPersonnelService
  ) {
    this.music = {};
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.route.data.subscribe((music: any) => {
      music.employe.date = new Date(music.employe.date || "");
      console.log(music);
      return (this.music = music.employe);
    });
  }

  submit(music: any) {
    this.listPersonnelService.update(music).subscribe(() => {
      this.router.navigate(['/listPersonnel']).then(r => null);
    });
  }

  cancel() {
    this.router.navigate(['/listPersonnel']).then(r => null);
  }

}
