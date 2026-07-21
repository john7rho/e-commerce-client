import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DarkModeToggleComponent } from './dark-mode-toggle.component';
import { ThemeService } from '../../../services/common/theme.service';

describe('DarkModeToggleComponent', () => {
  let component: DarkModeToggleComponent;
  let fixture: ComponentFixture<DarkModeToggleComponent>;

  beforeEach(async () => {
    localStorage.removeItem('theme');
    document.body.classList.remove('dark-mode');

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DarkModeToggleComponent],
      providers: [ThemeService],
    }).compileComponents();

    fixture = TestBed.createComponent(DarkModeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('theme');
    document.body.classList.remove('dark-mode');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the service state and rendered label when clicked', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    expect(button.textContent).toContain('Dark');
    button.click();
    fixture.detectChanges();

    expect(component.isDark).toBeTrue();
    expect(button.textContent).toContain('Light');
    expect(button.getAttribute('aria-label')).toBe('Switch to light mode');
  });
});
