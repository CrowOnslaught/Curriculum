import { MediaMatcher } from '@angular/cdk/layout';
import { flatten } from '@angular/compiler';
import { ChangeDetectorRef, HostListener, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TranslatorService } from '../../services/translator.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  // encapsulation: ViewEncapsulation.None

})
export class SidebarComponent implements OnInit{
  mobileQuery: MediaQueryList;
  isMenuOpen : boolean = true;
  hideMenu : boolean = false;

  //snackBar
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key == 'p')
    {
      this.toogleHideToolBar()
    }
  }

  fillerNav =
  [
    {name:'36', route:'cv',icon:'account_box'},
    {name:'37', route:'portfolio',icon:'work'}
  ]

  constructor(private ts : TranslatorService, private sb : MatSnackBar){}

  toogleHideToolBar()
  {
    this.horizontalPosition='left';
    if(this.hideMenu)
      this.openSnackBar("Showing ToolBar. Press 'P' to hide again", "showbar");
    else
      this.openSnackBar("Hiding ToolBar. Press 'P' to show again", "hidebar");

    this.hideMenu = !this.hideMenu;
  }

  onToolbarMenuToogle()
  {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getTranslationByID(id: string) : string
  {
    return this.ts.getTranslation(id);
  }
  changeLanguage(lang:string)
  {
    this.ts.ChangeLanguage(lang);
  }

  downloadCv(lang : string)
  {
    let l_link = document.createElement("a");

    l_link.download = "JaumeGarcia_Cv_" + lang + ".pdf";
    l_link.href =  "../../../../assets/resources/CVs/JaumeGarcia_Cv_" + lang + ".pdf";
    l_link.click();
    l_link.remove();

    this.horizontalPosition ='right';
    this.openSnackBar("Starting Donwload", "showbar");

  }

  openSnackBar(message: string, className: string){
    this.sb.open(message, '', {
      duration: 2000,
      panelClass: [className],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  ngOnInit()
  {
    let l_data = localStorage.getItem("langPack");
    if(l_data == null)
    {
        l_data = "ENG";
        localStorage.setItem("langPack", l_data);
    }

    this.ts.ChangeLanguage(l_data);
  }
}
