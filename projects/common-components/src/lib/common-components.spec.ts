import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonComponents } from './common-components';

describe('CommonComponents', () => {
  let component: CommonComponents;
  let fixture: ComponentFixture<CommonComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
