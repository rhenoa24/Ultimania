import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlipbookComponent } from './flipbook/flipbook.component';
import { TxtToHtmlComponent } from './txt-to-html/txt-to-html.component';

@NgModule({
  declarations: [
    AppComponent,
    FlipbookComponent,
    TxtToHtmlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
