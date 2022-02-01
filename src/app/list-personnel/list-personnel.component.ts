import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {mergeMap} from "rxjs";
import {AjoutPopupComponent} from "./ajout-popup/ajout-popup.component";
import {ListPersonnelService, Music} from "../partage/service/list-personnel.service";

@Component({
  selector: 'app-service',
  templateUrl: './list-personnel.component.html',
  styleUrls: ['./list-personnel.component.scss']
})
export class ListPersonnelComponent implements OnInit {

  private addDialog: MatDialogRef<AjoutPopupComponent> | any;
  personnel: Music[] = [];
  dialogStatus = 'inactive';
  view = 'card';
  dataSource = this.personnel;
  displayedColumns = ['title', 'album', 'artist']

  constructor(
    private readonly listPersonnelService: ListPersonnelService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef) {

  }

  personnelFiltered(personnel: any[]) {
    this.personnel = personnel;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.listPersonnelService.fetch().subscribe(personnel => {
      this.personnel = personnel || [];
    });
  }

  delete(music: Music) {
    this.listPersonnelService.delete(music.id!).subscribe(personnel => {
      this.personnel = personnel;
      this.listPersonnelService.updatedEmployeeList(music.id!);
      this.cdr.markForCheck();
    });
  }

  add(music: Music) {
    this.listPersonnelService
      .create(music)
      .pipe(mergeMap(() => this.listPersonnelService.fetch()))
      .subscribe(personnel => {
        this.personnel = personnel;
        this.hideDialog();
      });
  }

  update(music: Music) {
    this.listPersonnelService
      .update(music)
      .pipe(mergeMap(() => this.listPersonnelService.fetch()))
      .subscribe(personnel => {
        this.personnel = personnel;
        this.hideDialog();
      });
  }

  showDialog() {
    this.dialogStatus = 'active';
    this.addDialog = this.dialog.open(AjoutPopupComponent, {
      width: '600px',
      data: {}
    });

    this.addDialog.afterClosed().subscribe((music:any)=> {
      this.dialogStatus = 'inactive';
      if (music) {
        this.add(music);
      }
    });
  }

  hideDialog() {
    this.dialogStatus = 'inactive';
    if(this.addDialog != undefined){
      this.addDialog.close();
    }
  }

  switchView() {
    this.view = this.view === 'card' ? 'list' : 'card';
  }

}
