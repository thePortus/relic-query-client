import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailModelViewComponent } from './detail-model-view.component';

describe('DetailModelViewComponent', () => {
  let component: DetailModelViewComponent;
  let fixture: ComponentFixture<DetailModelViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailModelViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailModelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
