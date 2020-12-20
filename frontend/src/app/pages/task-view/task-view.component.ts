import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[]; 
  tasks: Task[]; 

  selectedListId: string; 

  constructor(private TaskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params); 
        // this.TaskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
        //   this.tasks = tasks; 
        // })
      }

    )

    this.TaskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists; 
    })
  }

  // onTaskClick(task: Task) {
  //   // we want to set the task to completed 
  //   this.TaskService.complete(task).subscribe(() => {
  //     console.log("Completed successfully!"); 
  //     // the task has been set to completed successfully 
  //     task.completed = !task.completed; 
  //   }); 
  // }

}
