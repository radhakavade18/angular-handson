import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
})
export class AngularMaterialModule {}

/*
HELPER MODULE FOR ANGULAR MATERIAL
  ONLY EXPORTS ADDED, ANGULAR WILL TAKE CARE ABOUT IMPORTS, SHORTEST VERSION OF MODULES
*/
