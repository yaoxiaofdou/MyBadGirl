import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // 设置list高度
    this.setListHeight();
  }

  // 设置list高度
  setListHeight(){
    let height = document.body.clientHeight-52;
    // LDetails__list
    document.querySelector('.userEdit__content').setAttribute('style','height:'+height+'px;overflow-y:scroll;');
    // console.log(document.body.clientHeight)
    
  }

}
