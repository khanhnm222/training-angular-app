import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() taskStatus: string = 'new';
  @Input() datasource: Array<TaskModel> = [];

  newTaskData: TaskModel[] = [];
  inProgressTaskData: TaskModel[] = [];
  doneTaskData: TaskModel[] = [];
  inprogressTaskList = {};
  doneTaskList = {};
  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges() {
    this.initialDatasource();
  }

  ngAfterViewInit() {
    
  }

  initialDatasource() {
    if(this.datasource && this.datasource.length > 0) {
      this.newTaskData = this.datasource.filter(res => res.status === 'new');
      this.inProgressTaskData = this.datasource.filter(res => res.status === 'inProgress');
      this.doneTaskData = this.datasource.filter(res => res.status === 'done');
    }
  }
}
 