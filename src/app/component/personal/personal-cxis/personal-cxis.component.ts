import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../server/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-cxis',
  templateUrl: './personal-cxis.component.html',
  styleUrls: ['./personal-cxis.component.scss']
})
export class PersonalCxisComponent implements OnInit {

  // 当前登陆用户
  private User:Object = {};
  // 进行中的列表数据
  private joinTaskList:Array<Object> = [];

  // 页面渲染对象
  private personalCxis:Object = {};

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.personalCxis = {
      listData:[],
    }
  }

  ngOnInit() {
    this.User = this.userService.returnUser();
    // 获取到的野狗数据对象转换成数组
    this.personalCxis['listData'] = this.changeJoinArray(this.User['joinTaskList']);
    console.log(this.personalCxis['listData'])
  }

  // 获取到的野狗数据对象转换成数组
  changeJoinArray(obj){
    let arr = [];
    for(let i in obj){
      arr.unshift(obj[i])
    }
    return arr
  }

}
