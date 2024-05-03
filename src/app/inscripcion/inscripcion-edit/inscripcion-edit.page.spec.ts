import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscripcionEditPage } from './inscripcion-edit.page';

describe('InscripcionEditPage', () => {
  let component: InscripcionEditPage;
  let fixture: ComponentFixture<InscripcionEditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InscripcionEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
