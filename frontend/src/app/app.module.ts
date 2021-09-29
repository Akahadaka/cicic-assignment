import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SearchModule } from '@app/pages/search/search.module'
import { EditDialogModule } from '@app/shared/edit-dialog/edit-dialog.module'
import { MaterialModule } from '@app/shared/material/material.module'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component'

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
  declarations: [AppComponent, AboutComponent, HomeComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
