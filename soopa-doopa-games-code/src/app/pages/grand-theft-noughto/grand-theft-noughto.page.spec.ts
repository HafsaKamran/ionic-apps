import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GrandTheftNoughtoPage } from './grand-theft-noughto.page';

describe('GrandTheftNoughtoPage', () => {
  let component: GrandTheftNoughtoPage;
  let fixture: ComponentFixture<GrandTheftNoughtoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrandTheftNoughtoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GrandTheftNoughtoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
