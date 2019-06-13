import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { IndexPageComponent } from './index-page/index-page.component';

const route: Routes = [
    { path: '', component: IndexPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin/login', component: AdminLoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'register', component: RegistrationComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(route)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
