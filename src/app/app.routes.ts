import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// 首页
import { HomeComponent } from './component/home/home.component';
// 详情页
import { DetailsComponent } from './component/details/details.component';
// 个人中心
import { PersonalComponent } from './component/personal/personal.component';
import { PersonalJoinComponent } from './component/personal/personal-join/personal-join.component';
import { UserEditComponent } from './component/user-edit/user-edit.component';

// login
import { LoginComponent } from './component/login/login.component';

export const appRoutes:Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },{
        path: 'login',
        component: LoginComponent
    },{
        path: 'home',
        component: HomeComponent
    },{
        path: 'detail/:id',
        component: DetailsComponent
    },{
        path: 'UserEdit',
        component: UserEditComponent
    },{
        path:'personal',
        component: PersonalComponent,
        // children:[
		// 	// 没登陆的时候要有默认路径，不然报错找不到，其实不影响操作
		// 	{ path:'personal',component:PersonalComponent },
		// 	{ path:'personal/join',component:PersonalJoinComponent },
		// ]
    },{
        path: '**',
        component: HomeComponent
    }
    
]