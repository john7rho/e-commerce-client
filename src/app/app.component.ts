import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {
  CustomToastrService,
  ToastrMessagePosition,
  ToastrMessageType,
} from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { ThemeService } from './services/ui/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    public themeService: ThemeService,
    private toastrSerice: CustomToastrService,
    private router: Router
  ) {
    authService.identityCheck();
    themeService.initialize();
  }

  signOut() {
    localStorage.removeItem('accessToken');
    this.authService.identityCheck();
    this.router.navigate(['']);
    this.toastrSerice.message('You are logged out', 'Logged Out', {
      messageType: ToastrMessageType.Warning,
      messagePosition: ToastrMessagePosition.TopRight,
    });
  }
}
