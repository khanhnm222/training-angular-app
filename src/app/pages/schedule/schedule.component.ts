import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ScheduleModel } from 'src/app/models/schedule.model';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  schedules: ScheduleModel[] = [];
  schedule: ScheduleModel = {
    id: '',
    title: '',
    creator: '',
    description: '',
    location: '',
    startTime: '',
    endTime: ''
  };
  scheduleForm: FormGroup = this._fb.group({});
  constructor(
    private scheduleService: ScheduleService,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getScheduleData();
  }

  getScheduleData() {
    return this.scheduleService.getAllSchedules().subscribe(data => {
      this.schedules = data;
    });;
  }

  getRow(row: ScheduleModel) {
    this.schedule.id = row.id;
    this.schedule.creator = row.creator;
    this.schedule.description = row.description;
    this.schedule.location = row.location;
  }

  onDelete() {
    let id =  this.schedule.id;
    this.scheduleService.deleteSchedule(id).subscribe((res) => {
      if (res) {
        const newScheduleList = this.schedules.filter(schedule => schedule.id !== id);
        this.schedules = newScheduleList;
      }
    });
  }

  onCancelDelete() {}
}
