import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAsidenavComponent } from './home-asidenav.component';

describe('HomeAsidenavComponent', () => {
  let component: HomeAsidenavComponent;
  let fixture: ComponentFixture<HomeAsidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAsidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAsidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
