import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleExperienceComponent } from './simple-experience.component';

describe('SimpleExperienceComponent', () => {
  let component: SimpleExperienceComponent;
  let fixture: ComponentFixture<SimpleExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
