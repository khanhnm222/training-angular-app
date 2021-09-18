import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel } from 'src/app/models/task.model';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, AfterViewInit {

  taskForm: FormGroup = this._fb.group({});
  taskDetail: TaskModel = {
    id: '',
    name: '',
    description: '',
    status: ''
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService,
    private _fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.getDetailData();
    this.createForm();
  }

  ngAfterViewInit() {
  }

  getDetailData() {
    const id = this.route.snapshot.paramMap.get("id");
    this.dashboardService.getTaskById(id as string).subscribe((res: TaskModel) => {
      this.taskDetail.id = res.id;
      this.taskDetail.name = res.name;
      this.taskDetail.description = res.description;
      this.taskDetail.status = res.status;
      this.setValueIntoForm(res);
    });
  }

  createForm() {
    this.taskForm = this._fb.group({
      id: this.taskDetail.id,
      name: this.taskDetail.name,
      description: this.taskDetail.description,
      status: this.taskDetail.status
    })
  } 

  setValueIntoForm(taskDetail: TaskModel) {
    this.taskForm.setValue({
      id: taskDetail.id,
      name: taskDetail.name,
      description: taskDetail.description,
      status: taskDetail.status
    });
  }

  saveTask() {
    if(this.taskForm.valid) {
      let id = this.taskForm.controls.id.value;
      this.dashboardService.putTask(id, this.taskForm.value).subscribe(() => {
        this.router.navigate(['/dashboard', { relativeTo: this.route }]);
      });
    }
  }

  onDelete() {
    this.deleteTask();
  }

  onCancelDelete() {}

  deleteTask() {
    let id = this.taskForm.controls.id.value;
    this.dashboardService.deleteTask(id).subscribe(() => {
      this.router.navigate(['/dashboard', { relativeTo: this.route }]);
    });
  }
}
