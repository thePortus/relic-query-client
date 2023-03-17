import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModelViewComponent } from './add-model-view.component';

describe('AddModelViewComponent', () => {
  let component: AddModelViewComponent;
  let fixture: ComponentFixture<AddModelViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModelViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddModelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
