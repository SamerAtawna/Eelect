import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocateRequestComponent } from './Pages/locate-request/locate-request.component';
import { RequestDetailsComponent } from './Pages/request-details/request-details.component';


const routes: Routes = [
{ path: '', redirectTo: '/locate-request', pathMatch: 'full' },
{ path: 'locate-request', component: LocateRequestComponent },
{ path: 'request-details', component: RequestDetailsComponent },
{ path: '**', component: LocateRequestComponent },
{ path: '*', component: LocateRequestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
