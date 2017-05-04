import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalJoinComponent } from './personal-join.component';

describe('PersonalJoinComponent', () => {
  let component: PersonalJoinComponent;
  let fixture: ComponentFixture<PersonalJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalJoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
