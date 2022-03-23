import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegformComponent } from './regform/regform.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  {
    path:'',component:RegformComponent

},
{
  path:'regform',component:RegformComponent

},
{
  path:'success',component:SuccessComponent

},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
