import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalReleaseComponent } from './personal-release.component';

describe('PersonalReleaseComponent', () => {
  let component: PersonalReleaseComponent;
  let fixture: ComponentFixture<PersonalReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
