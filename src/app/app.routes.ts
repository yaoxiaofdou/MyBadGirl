import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// 首页
import { HomeComponent } from './home/home.component';
// 详情页
import { DetailsComponent } from './details/details.component';
// 个人中心
import { PersonalComponent } from './personal/personal.component';
import { PersonalJoinComponent } from './personal/personal-join/personal-join.component';
import { UserEditComponent } from './user-edit/user-edit.component';

export const appRoutes:Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
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