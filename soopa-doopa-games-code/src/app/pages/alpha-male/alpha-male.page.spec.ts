import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlphaMalePage } from './alpha-male.page';

describe('AlphaMalePage', () => {
  let component: AlphaMalePage;
  let fixture: ComponentFixture<AlphaMalePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlphaMalePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlphaMalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
