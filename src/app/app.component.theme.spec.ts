import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService } from './services/ui/custom-toastr.service';
import { ThemeService } from './services/ui/theme.service';

describe('AppComponent dark-mode toggle', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let themeService: ThemeService;

  beforeEach(async () => {
    localStorage.clear();
    document.body.classList.remove('dark-theme');

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: false,
            identityCheck: jasmine.createSpy('identityCheck'),
          },
        },
        {
          provide: CustomToastrService,
          useValue: {},
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
    document.body.classList.remove('dark-theme');
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the theme and update the button label', () => {
    const button = fixture.nativeElement.querySelector(
      'button.btn-outline-secondary'
    ) as HTMLButtonElement;

    expect(themeService.isDark).toBeFalse();
    expect(button.textContent).toContain('Dark Mode');

    button.click();
    fixture.detectChanges();

    expect(themeService.isDark).toBeTrue();
    expect(button.textContent).toContain('Light Mode');
  });
});
