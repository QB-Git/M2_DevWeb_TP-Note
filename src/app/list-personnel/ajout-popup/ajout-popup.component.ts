import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Music} from "../../partage/service/list-personnel.service";

export type PopupAction = Music & {mode: string};

@Component({
  selector: 'app-ajout-popup',
  templateUrl: './ajout-popup.component.html',
  styleUrls: ['./ajout-popup.component.scss']
})
export class AjoutPopupComponent {

  constructor(public dialogRef: MatDialogRef<AjoutPopupComponent>) {}

  closeDialog(result: Music & {mode?: string} | null = null) {
    this.dialogRef.close(result);
  }

  onCancel() {
    this.closeDialog();
  }

  onCreate(music: Music) {
    this.closeDialog({...music, mode: 'create'});
  }

  onUpdate(music: Music) {
    this.closeDialog({...music, mode: 'update'});
  }

}
