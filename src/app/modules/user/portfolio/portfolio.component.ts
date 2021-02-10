import { Component } from '@angular/core';
import { TranslatorService } from 'src/app/shared/services/translator.service';
import { slideInOutAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]':''}
})
export class PortfolioComponent {

  constructor(private ts : TranslatorService) { }

  getTranslationByID(id: string) : string
  {
    return this.ts.getTranslation(id);
  }

}
