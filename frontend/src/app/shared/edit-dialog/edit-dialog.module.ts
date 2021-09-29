import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MaterialModule } from '../material/material.module'
import { EditDialogComponent } from './edit-dialog.component'



@NgModule({
  declarations: [EditDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class EditDialogModule { }
