import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchComponent } from './pages/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [AppRoutingModule, BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, SearchComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
