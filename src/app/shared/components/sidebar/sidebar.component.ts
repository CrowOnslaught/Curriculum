import { HostListener, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TranslatorService } from '../../services/translator.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class SidebarComponent implements OnInit{

  //Background Music
  bgm = new Audio("https://github.com/CrowOnslaught/Curriculum/blob/master/docs/assets/resources/sounds/PYLOT-TheReturn.mp3?raw=true")
  bgm_volume : number;

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
    {name:'55', route:'home',icon:'home'},
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

  //#region Light Theme
    onToogleDarkMode()
    {
      this.lightMode = !this.lightMode;
      localStorage.setItem("theme", this.lightMode? 'light':'dark' );

      let r = (document.querySelector(':root') as HTMLElement);
      let rs = getComputedStyle(r);

      let l_pc = this.lightMode? rs.getPropertyValue('--pc-light') : rs.getPropertyValue('--pc-dark');
      let l_sc = this.lightMode? rs.getPropertyValue('--sc-light') : rs.getPropertyValue('--sc-dark');
      let l_pbc = this.lightMode? rs.getPropertyValue('--pbc-light') : rs.getPropertyValue('--pbc-dark');

      let l_bgImg = this.lightMode? 'none' : "url('assets/resources/images/bg.jpg')";
      (document.querySelector('.sidenav') as HTMLElement).style.backgroundImage = l_bgImg;


      r.style.setProperty('--primary-color', l_pc);
      r.style.setProperty('--secondary-color', l_sc);
      r.style.setProperty('--post-bg-color', l_pbc);
    }
  //#endregion

  //#region Translation
    getTranslationByID(id: string) : string
    {
      return this.ts.getTranslation(id);
    }
    changeLanguage(lang:string)
    {
      this.ts.ChangeLanguage(lang);
    }
  //#endregion

  //#region Download
  downloadCv()
  {
    let l_link = document.createElement("a");

    let l_theme = this.lightMode? "lightTheme" : "darkTheme";
    let l_lang = this.ts.getCurrentLanguage();

    l_link.download = "JaumeGarcia_Cv_" + l_lang + ".pdf";
    l_link.href =  "assets/resources/CVs/"+ l_theme +"/JaumeGarcia_Cv_" + l_lang + ".pdf";
    l_link.click();
    l_link.remove();

    this.horizontalPosition ='right';
    this.openSnackBar("Starting Donwload", "showbar");

  }
//#endregion


//#region SnackBar
  openSnackBar(message: string, className: string){
    this.sb.open(message, '', {
      duration: 2000,
      panelClass: [className],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  //#endregion

  ngOnInit()
  {
    window.onbeforeprint = () => {this.hideMenu = true;};
    window.onafterprint = () => {this.hideMenu = false;};

    this.getLocalStorageData();
    this.playMusic();

    this.innerWidth = window.innerWidth;
    this.showHideMenuEye = this.innerWidth > 900;
  }

  //#region  Background Music
  playMusic()
  {
    this.bgm.addEventListener('ended', function()
    {
      this.currentTime = 0;
      this.play();
    }, false);
    this.bgm.volume = 0;
  }
  onMuteMusic()
  {
    if(this.bgm.volume == 0)
    {
      if(this.bgm.paused)
        this.bgm.play();

      this.bgm.volume = this.bgm_volume;
    }
    else
    {
      this.bgm.volume = 0;
    }
  }
  getSliderTickInterval(event : MatSliderChange)
  {
    this.bgm_volume = event.value;
    this.bgm.volume = this.bgm_volume;
    localStorage.setItem('bgm_volume', String(this.bgm.volume));

    if(this.bgm.paused)
      this.bgm.play();
  }
  //#endregion


  //#region LocalStorage
  getLocalStorageData()
  {
    let l_data = localStorage.getItem("langPack");
    if(l_data == null)
    {
        l_data = "ENG";
        localStorage.setItem("langPack", l_data);
    }

    this.ts.ChangeLanguage(l_data);

    l_data = localStorage.getItem("theme");
    if(l_data == null)
    {
        l_data = "dark";
        localStorage.setItem("theme", l_data);
    }

    if(l_data=='light')
      this.onToogleDarkMode();

    l_data = localStorage.getItem("bgm_volume");
    if(l_data == null)
    {
        l_data = "0.1";
        localStorage.setItem("bgm_volume", l_data);
    }

    this.bgm_volume = Number(l_data);
    this.bgm.volume = this.bgm_volume;
  }
  //#endregion


  @HostListener('window:resize', ['$event']) onResize(event)
  {
    this.innerWidth = window.innerWidth;
    this.showHideMenuEye = this.innerWidth > 900;
  }
}
