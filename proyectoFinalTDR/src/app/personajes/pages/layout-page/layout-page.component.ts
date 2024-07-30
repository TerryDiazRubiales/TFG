import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [],
})
export class LayoutPageComponent {

  private authService=inject(AuthService);

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },

    { label: 'Añadir', icon: 'add', url: './new-personaje' },

    { label: 'Buscar ...', icon: 'search', url: './search' },
  ];

  logout (): void {
    this.authService.logout();
  }
}
