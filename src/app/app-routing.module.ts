import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';

const routes: Routes = [
  {path:'home', component:HomeComponent },
  {path:'user',  loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)},
  {path:'', redirectTo:'home', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation:'reload',
    scrollPositionRestoration: 'enabled', // or 'top'
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64] // [x, y] - adjust scroll offset
            })
          ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
