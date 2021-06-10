import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KingForADayPage } from './king-for-a-day.page';

describe('KingForADayPage', () => {
  let component: KingForADayPage;
  let fixture: ComponentFixture<KingForADayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KingForADayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KingForADayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
