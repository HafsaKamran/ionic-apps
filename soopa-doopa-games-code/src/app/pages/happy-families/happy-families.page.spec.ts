import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HappyFamiliesPage } from './happy-families.page';

describe('HappyFamiliesPage', () => {
  let component: HappyFamiliesPage;
  let fixture: ComponentFixture<HappyFamiliesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HappyFamiliesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HappyFamiliesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
