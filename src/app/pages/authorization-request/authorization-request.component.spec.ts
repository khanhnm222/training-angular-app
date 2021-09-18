import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationRequestComponent } from './authorization-request.component';

describe('AuthorizationRequestComponent', () => {
  let component: AuthorizationRequestComponent;
  let fixture: ComponentFixture<AuthorizationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
