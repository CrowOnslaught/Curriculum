import { Component, OnInit } from '@angular/core';
import { TranslatorService } from '../../services/translator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private ts : TranslatorService) { }

  ngOnInit(): void
  {

  }
  getTranslationByID(id: string) : string
  {
    return this.ts.getTranslation(id);
  }
  navigateTo(url:string)
  {
    window.open(url, '_blank');
  }
}
