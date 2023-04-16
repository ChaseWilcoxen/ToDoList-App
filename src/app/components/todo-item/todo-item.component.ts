import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/Todo';
import { Component, OnInit, Input, EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo : Todo;
  @Output() deleteTodo : EventEmitter<Todo> = new EventEmitter();
  constructor(private todoservice:TodoService) { }

  ngOnInit(): void {
  }

  //set Dynamic classes
  setClasses(){
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }
    return classes;
  }

  onToggle(todo){
    //toggle in ui
    todo.completed = !todo.completed;
    //toggle on server
    this.todoservice.toggleCompleted(todo).subscribe(todo => console.log(todo)
    );
    
  }
  onDelete(todo){
    this.deleteTodo.emit(todo);
    
  }
}
