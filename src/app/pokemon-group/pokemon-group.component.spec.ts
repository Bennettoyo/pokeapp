import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonGroupComponent } from './pokemon-group.component';

describe('PokemonGroupComponent', () => {
  let component: PokemonGroupComponent;
  let fixture: ComponentFixture<PokemonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
