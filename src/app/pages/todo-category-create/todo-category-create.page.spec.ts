import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCategoryCreatePage } from './todo-category-create.page';

describe('TodoCategoryCreatePage', () => {
  let component: TodoCategoryCreatePage;
  let fixture: ComponentFixture<TodoCategoryCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoCategoryCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCategoryCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
