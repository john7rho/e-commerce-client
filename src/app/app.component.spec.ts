import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => localStorage.getItem('accessToken'),
          },
        }),
        NgxSpinnerModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
      declarations: [AppComponent],
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
