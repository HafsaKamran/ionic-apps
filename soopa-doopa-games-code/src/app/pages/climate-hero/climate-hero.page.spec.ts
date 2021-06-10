import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClimateHeroPage } from './climate-hero.page';

describe('ClimateHeroPage', () => {
  let component: ClimateHeroPage;
  let fixture: ComponentFixture<ClimateHeroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClimateHeroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClimateHeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
