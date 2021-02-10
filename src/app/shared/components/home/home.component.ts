import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslatorService } from '../../services/translator.service';

import { slideInOutAnimation } from '../../animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]':''}
})
export class HomeComponent implements OnInit {

  constructor(private ts : TranslatorService) { }

  ngOnInit(): void
  {
    let l_bg_anim_Img = environment.lightMode? "url('assets/resources/images/backGrounds/bg_anim_L.gif')" : "url('assets/resources/images/backGrounds/bg_anim_D.gif')";
    (document.querySelector('.homeBody') as HTMLElement).style.backgroundImage = l_bg_anim_Img;
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
