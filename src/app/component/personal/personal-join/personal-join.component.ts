import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../server/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-join',
  templateUrl: './personal-join.component.html',
  styleUrls: ['./personal-join.component.scss']
})
export class PersonalJoinComponent implements OnInit {

  // 当前登陆用户
  private User:Object = {};
  // 进行中的列表数据
  private joinTaskList:Array<Object> = [];

  // 页面渲染对象
  private personalJoin:Object = {};

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.personalJoin = {
      listData:[],
    }
  }

  ngOnInit() {
    this.User = this.userService.returnUser();
    // 获取到的野狗数据对象转换成数组
    this.personalJoin['listData'] = this.changeJoinArray(this.User['joinTaskList']);
  }

  // 获取到的野狗数据对象转换成数组
  changeJoinArray(obj){
    let arr = [];
    for(let i in obj){
      arr.unshift(obj[i])
    }
    return arr
  }

  // 查看详情
  joinLiDetail(task){
    this.router.navigate(['/detail', task['id']]);
  }

  // 删除选中
  removeJoinLi(task){
    this.userService.removeWilddogJoinTaskFun(task, this.User);
    // 重新获取列表数据
    this.personalJoin['listData'] = this.userService.removeUserJoinTaskList(task);
    // console.log(this.personalJoin['listData'])
  }

}
