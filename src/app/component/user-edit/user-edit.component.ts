import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  // 页面对象
  private userEdit:Object = {};

  // 提交的表单对象
  private SubmttObj:Object = {};

  constructor() { 
    // 初始化页面对象数据
    this.userEdit = {
      zIndex:8,
      cls:[
        {
          name: '任'
        },
        {
          name: '活'
        }
      ],
      Rname:'',
      Rdetail:'',
      Rcount:[
        {
          name:'米'
        },{
          name:'RMB'
        },{
          name:'个'
        }
      ],
      Rdate:'',
      Rrule:'',
      Rsubmit:'',
    };
    // 提交的页面数据对象
    this.SubmttObj = {
      cls: '',
      Rname: '',
      Rdetail: '',
      Rcount: '',
      Rdate: '',
      Rrule: '',
      Rsubmit: '',
    }
  }

  ngOnInit() {
    // 设置list高度
    this.setListHeight();
  }

  // 控制层级，递减z-index
  reduceZIndexFun(){
    this.userEdit['zIndex'] -= 1;
  }

  // 设置list高度
  setListHeight(){
    let height = document.body.clientHeight-52;
    // LDetails__list
    document.querySelector('.userEdit__content').setAttribute('style','height:'+height+'px;overflow-y:scroll;');
    // console.log(document.body.clientHeight)
    
  }

}
