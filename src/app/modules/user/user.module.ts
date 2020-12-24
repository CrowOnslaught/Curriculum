import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { CvComponent } from './cv/cv.component';
import { MaterialModule } from 'src/app/shared/material';


@NgModule({
  declarations: [PortfolioComponent, CvComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule
  ],
  exports: [PortfolioComponent, CvComponent]
})
export class UserModule { }
