import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SearchModule } from '@app/pages/search/search.module'
import { EditDialogModule } from '@app/shared/edit-dialog/edit-dialog.module'
import { MaterialModule } from '@app/shared/material/material.module'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    EditDialogModule,
    HttpClientModule,
    MaterialModule,
    SearchModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
