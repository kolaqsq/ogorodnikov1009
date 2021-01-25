import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {InfoComponent} from "./info/info.component";

const routes: Routes = [{
  path: '',
  component: MainComponent,
},
  {
    path: 'info',
    component: InfoComponent,
  },
  {
    path: 'workers',
    loadChildren: () =>
      import('./workers/workers.module').then((m) => m.WorkersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
