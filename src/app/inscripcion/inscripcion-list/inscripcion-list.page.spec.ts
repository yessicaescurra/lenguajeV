import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscripcionListPage } from './inscripcion-list.page';

describe('InscripcionListPage', () => {
  let component: InscripcionListPage;
  let fixture: ComponentFixture<InscripcionListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InscripcionListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
