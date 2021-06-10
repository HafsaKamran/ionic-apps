import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorldTravellerPage } from './world-traveller.page';

describe('WorldTravellerPage', () => {
  let component: WorldTravellerPage;
  let fixture: ComponentFixture<WorldTravellerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldTravellerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorldTravellerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
