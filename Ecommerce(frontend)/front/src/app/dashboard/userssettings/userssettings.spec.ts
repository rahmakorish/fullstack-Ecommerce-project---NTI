import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userssettings } from './userssettings';

describe('Userssettings', () => {
  let component: Userssettings;
  let fixture: ComponentFixture<Userssettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Userssettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userssettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
