import { Injectable } from '@angular/core';
import * as data from '../../../assets/resources/lang/langpack.json'
import { Langkey } from '../interfaces/langkey';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  private _langKeys : Langkey[] = [];
  private _currentLang : string = "ENG";

  constructor()
  {
    for(let m of data.default)
    {
      let l_key=
      {
        id:  m.lang_key.id,
        ENG: m.lang_key.ENG,
        ESP: m.lang_key.ESP,
        CAT: m.lang_key.CAT,
      }

      this._langKeys.push(l_key);
    }
  }

  public getTranslation(key:string) : string
  {
    let l_result = "TRANSLATION ERROR";
    let l_key : Langkey = this._langKeys.find(m => m.id == ('text'+key));
    switch(this._currentLang)
    {
      case "ENG":
        l_result = l_key.ENG;
        break;
      case "ESP":
        l_result = l_key.ESP;
        break;
      case "CAT":
        l_result = l_key.CAT;
        break;
    }

    return l_result;
  }

  public ChangeLanguage(lang: string)
  {
    this._currentLang = lang;
    localStorage.setItem("langPack", this._currentLang);
  }

  public getCurrentLanguage() :string
  {
    return this._currentLang;
  }
}
