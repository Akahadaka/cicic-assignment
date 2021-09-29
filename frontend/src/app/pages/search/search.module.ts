import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '@app/shared/material/material.module'

import { SearchRoutingModule } from './search-routing.module'
import { SearchComponent } from './search.component'

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SearchRoutingModule,
  ]
})
export class SearchModule { }
