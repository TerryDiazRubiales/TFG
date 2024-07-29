import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { catchError, map } from 'rxjs';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  register() {
    const { name, email, password } = this.myForm.value;

    this.authService.register(name, email, password).subscribe({
      next: (response) => {
        Swal.fire(
          'Registrado',
          'El usuario se registro correctamente',
          'success'
        ),
          this.router.navigateByUrl('/auth/login');
      },
      error: (error) =>
        Swal.fire('Error', 'No se pudo realizar el registro', 'error'),
    });
  }
}
