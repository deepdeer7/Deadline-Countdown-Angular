import { SpDeadlineCountdownComponent } from './sp-deadline-countdown.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeadlineCountdownService } from '../../services/deadline-countdown.service';
import { LoadingService } from '../../services/loading.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { of } from 'rxjs';

describe('SpDeadlineCountdownComponent', () => {
  let component: SpDeadlineCountdownComponent;
  let fixture: ComponentFixture<SpDeadlineCountdownComponent>;
  let mockLoadingService: jasmine.SpyObj<LoadingService>;
  let deadlineCountdownServiceStub: jasmine.SpyObj<DeadlineCountdownService>;

  beforeEach(() => {
    deadlineCountdownServiceStub = jasmine.createSpyObj(
      'DeadlineCountdownService',
      ['getSecondsLeft']
    );
    deadlineCountdownServiceStub.getSecondsLeft.and.returnValue(of(5));

    mockLoadingService = jasmine.createSpyObj('LoadingService', ['loading']);

    TestBed.configureTestingModule({
      imports: [CommonModule, SpDeadlineCountdownComponent, AsyncPipe],
      providers: [
        {
          provide: DeadlineCountdownService,
          useValue: deadlineCountdownServiceStub,
        },
        { provide: LoadingService, useValue: mockLoadingService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SpDeadlineCountdownComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message when isError is true', () => {
    component.isError = true;

    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error');
    expect(errorMessage.textContent.trim()).toBe(
      'Sorry, error happened. Please, reload the page or try later'
    );
  });

  it('should display loading alert when loading service returns true', () => {
    mockLoadingService.loading.and.returnValue(true);

    fixture.detectChanges();
    const loadingAlert = fixture.nativeElement.querySelector('.loading-alert');
    expect(loadingAlert).toBeTruthy();
  });

  it('should display countdown when loading service returns false', () => {
    mockLoadingService.loading.and.returnValue(false);

    fixture.detectChanges();

    const countdownElement =
      fixture.nativeElement.querySelector('.time-left-title');
    expect(countdownElement.textContent.trim()).toContain(
      'Seconds left to deadline:'
    );
  });
});
