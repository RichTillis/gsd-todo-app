import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTodoPage } from './create-todo.page';

describe('CreateTodoPage', () => {
  let component: CreateTodoPage;
  let fixture: ComponentFixture<CreateTodoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTodoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
