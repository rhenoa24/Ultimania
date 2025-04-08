import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlipbookComponent } from './flipbook/flipbook.component';
import { TxtToHtmlComponent } from './txt-to-html/txt-to-html.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { FlippageComponent } from './flippage/flippage.component';

@NgModule({
  declarations: [
    AppComponent,
    FlipbookComponent,
    TxtToHtmlComponent,
    DialogBoxComponent,
    FlippageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [
    DialogBoxComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
