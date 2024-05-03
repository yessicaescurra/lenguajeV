import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAlumnoPage } from './create-alumno.page';

describe('CreateAlumnoPage', () => {
  let component: CreateAlumnoPage;
  let fixture: ComponentFixture<CreateAlumnoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
