import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifyLetterComponent } from './certify-letter.component';

describe('CertifyLetterComponent', () => {
  let component: CertifyLetterComponent;
  let fixture: ComponentFixture<CertifyLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertifyLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifyLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
