import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  datasourceList: any;
  constructor(
    private dashboadService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getTaskListData();
  }

  // getTaskListData() {
  //   this.dashboadService.getJsonDataFile('./assets/dummy/task-list.json').subscribe(data => {
  //     this.datasource = data;
  //   });;
  //   return this.datasource as TaskCardList;
  // }

  getTaskListData() {
    this.dashboadService.getAllTasks().subscribe((data) => {
      return of(this.datasourceList = data ? data : []);
    });
  }
}
