import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalCxisComponent } from './personal-cxis.component';

describe('PersonalCxisComponent', () => {
  let component: PersonalCxisComponent;
  let fixture: ComponentFixture<PersonalCxisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalCxisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalCxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
