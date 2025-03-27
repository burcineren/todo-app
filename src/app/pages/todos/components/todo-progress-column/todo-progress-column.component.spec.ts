import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoProgressColumnComponent } from './todo-progress-column.component';

describe('TodoProgressColumnComponent', () => {
  let component: TodoProgressColumnComponent;
  let fixture: ComponentFixture<TodoProgressColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoProgressColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoProgressColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
