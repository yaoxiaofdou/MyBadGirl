import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HomeListDataService } from '../../server/home-list-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  // 保存当前活动
  private activity:Object = {};

  constructor(
    private router:ActivatedRoute,
    private homeListServer:HomeListDataService,
  ) { }

  ngOnInit() {
    // 根据任务颜色设置页面主题
    this.setHtmlColor();
  }

  // 根据任务颜色设置页面主题
  setHtmlColor(){
    this.router.params.subscribe((params: Params) => {
        // params
        let aid = params;
        // 根据当前活动的id去服务中获取活动的详情
        this.activity = this.homeListServer.getDetail(aid);
        console.log(this.activity)
    });
  }

}
