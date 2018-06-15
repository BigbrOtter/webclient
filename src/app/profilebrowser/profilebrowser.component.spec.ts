import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilebrowserComponent } from './profilebrowser.component';

describe('ProfilebrowserComponent', () => {
  let component: ProfilebrowserComponent;
  let fixture: ComponentFixture<ProfilebrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilebrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilebrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
