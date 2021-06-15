import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './pages/history/history.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  { path: "search", component: SearchComponent },
  { path: "history", component: HistoryComponent }
];
export const ROUTES: Routes = [{
  path: '',
  component: SearchComponent,
}, {
  path: '**',
  redirectTo: 'search'
}];
@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

