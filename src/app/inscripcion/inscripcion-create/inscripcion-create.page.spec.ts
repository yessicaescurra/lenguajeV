import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscripcionCreatePage } from './inscripcion-create.page';

describe('InscripcionCreatePage', () => {
  let component: InscripcionCreatePage;
  let fixture: ComponentFixture<InscripcionCreatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InscripcionCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
