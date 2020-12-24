import { Component, OnInit } from '@angular/core';
import { TranslatorService } from 'src/app/shared/services/translator.service';


@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent {

  constructor(private ts : TranslatorService) { }

  getTranslationByID(id: string) : string
  {
    return this.ts.getTranslation(id);
  }
}
