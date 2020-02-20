import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatSliderModule,
  MatCardModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
} from '@angular/material';

const materialComponents = [
  MatSliderModule, 
  MatCardModule, 
  MatFormFieldModule,
  MatInputModule, 
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materialComponents
  ],
  exports: [
    materialComponents
  ]
})
export class MaterialModule { }
