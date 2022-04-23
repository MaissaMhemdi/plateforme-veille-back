import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresArchivesComponent } from './offres-archives.component';

describe('OffresArchivesComponent', () => {
  let component: OffresArchivesComponent;
  let fixture: ComponentFixture<OffresArchivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffresArchivesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffresArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
