import { HostListener, ViewEncapsulation } from '@angular/core';
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
  isMenuOpen : boolean = false;
  hideMenu : boolean = false;
  showHideMenuEye: boolean = true;
  innerWidth: any;
  lightMode : boolean;

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

  constructor(private ts : TranslatorService, private sb : MatSnackBar) {}

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

  onToogleDarkMode()
  {
    this.lightMode = !this.lightMode;

    let r = (document.querySelector(':root') as HTMLElement);
    let rs = getComputedStyle(r);

    let l_pc = this.lightMode? rs.getPropertyValue('--pc-light') : rs.getPropertyValue('--pc-dark');
    let l_sc = this.lightMode? rs.getPropertyValue('--sc-light') : rs.getPropertyValue('--sc-dark');
    let l_pbc = this.lightMode? rs.getPropertyValue('--pbc-light') : rs.getPropertyValue('--pbc-dark');
    console.log(l_pc+"|"+l_sc+"|"+l_pbc);

    let l_bgImg = this.lightMode? 'none' : "url('../../../../assets/resources/images/bg.jpg')";
    (document.querySelector('.sidenav') as HTMLElement).style.backgroundImage = l_bgImg;


    r.style.setProperty('--primary-color', l_pc);
    r.style.setProperty('--secondary-color', l_sc);
    r.style.setProperty('--post-bg-color', l_pbc);
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
    l_link.href =  "assets/resources/CVs/JaumeGarcia_Cv_" + lang + ".pdf";
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

    this.innerWidth = window.innerWidth;
    this.showHideMenuEye = this.innerWidth > 900;
  }


  @HostListener('window:resize', ['$event']) onResize(event)
  {
    this.innerWidth = window.innerWidth;
    this.showHideMenuEye = this.innerWidth > 900;
  }
}
