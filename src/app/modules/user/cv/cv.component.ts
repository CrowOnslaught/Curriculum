import { Component } from '@angular/core';
import { TranslatorService } from 'src/app/shared/services/translator.service';

import { slideInOutAnimation } from '../../../shared/animations';


@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]':''}
})
export class CvComponent{

  constructor(private ts : TranslatorService) { }

  getTranslationByID(id: string) : string
  {
    return this.ts.getTranslation(id);
  }
}
