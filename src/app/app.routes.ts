import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// 首页
import { HomeComponent } from './home/home.component';
// 详情页
import { DetailsComponent } from './details/details.component';
// 个人中心
import { PersonalComponent } from './personal/personal.component';

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
        path:'personal',
        component: PersonalComponent
    },{
        path: '**',
        component: HomeComponent
    }
    
]