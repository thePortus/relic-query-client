import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModelViewComponent } from './list-model-view.component';

describe('ListModelViewComponent', () => {
  let component: ListModelViewComponent;
  let fixture: ComponentFixture<ListModelViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListModelViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListModelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
