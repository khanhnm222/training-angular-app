import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel } from 'src/app/models/task.model';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.scss']
})
export class AddNewTaskComponent implements OnInit {

  taskForm: FormGroup = this._fb.group({});
  taskDetail: TaskModel = {
    id: '',
    name: '',
    description: '',
    status: ''
  };
  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private router: Router,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.taskForm = this._fb.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: 'new'
    })
  } 

  saveTask() {
    if (this.taskForm.valid) {
      this.dashboardService.postTask(this.taskForm.value).subscribe(res => {
        this.router.navigate(['/dashboard', { relativeTo: this.route }]);
      });
    }
  }
  
}
