import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppComponent } from './app.component';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService } from './services/ui/custom-toastr.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        CommonModule,
        NgxSpinnerModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            identityCheck: jasmine.createSpy('identityCheck'),
            isAuthenticated: false,
          },
        },
        {
          provide: CustomToastrService,
          useValue: { message: jasmine.createSpy('message') },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the brand and primary navigation links', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.navbar-brand')?.textContent).toContain(
      'E-Commerce'
    );
    expect(
      compiled.querySelector('.nav-link[routerLink=""]')?.textContent
    ).toContain('Home');
    expect(
      compiled.querySelector('a[routerLink="products"]')?.textContent
    ).toContain('Products');
    expect(
      compiled.querySelector('a[routerLink="baskets"]')?.textContent
    ).toContain('Baskets');
  });
});
