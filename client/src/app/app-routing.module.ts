import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NavbarComponent} from "./components/navbar/navbar.component";
import { HomeComponent } from './components/home/home.component'

const appRoutes: Routes = [
  { path: '',
    component : HomeComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
