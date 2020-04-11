import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { TasksPageComponent } from './tasks-page/tasks-page.component';


const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    data: {
      title: 'Todo application'
    }
  },
  {
    path: 'tasks',
    component: TasksPageComponent,
    data: {
      title: 'Task'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
