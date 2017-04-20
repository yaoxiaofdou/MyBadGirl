import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  // user 数据
  private userListData:Array<Object> = [
    {
      id:'1024001',
      img:'src/images/1.png',
      name:'xiaofeng.yao',
      joinSum:22,
      editSum:11
    }
  ];

  constructor() { }

  // 返回当前用户数据
  getThisUser(){
    let user = this.userListData[0];
    return user
  }

}
