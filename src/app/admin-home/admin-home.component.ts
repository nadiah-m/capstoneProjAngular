import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../_Services/project.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  projectList: any = [];
  filterTerm!: string;
  p: number = 1;

  constructor(public projectService: ProjectService) {}

  public getProjectList() {
    this.projectService.getProjectList().subscribe((res) => {
      this.projectList = res.data;
      console.log('projectList', this.projectList);
      return this.projectList;
    });
  }

  ngOnInit(): void {
    this.getProjectList();
  }
}
