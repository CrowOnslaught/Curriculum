import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material';
import { UserModule } from './modules/user/user.module';
import { SmoothWidthComponent } from './shared/components/sidebar/smooth_width.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SmoothWidthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [SidebarComponent]
})
export class AppModule { }
