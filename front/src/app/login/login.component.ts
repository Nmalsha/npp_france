// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../service/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   username: string = '';
//   password: string = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   onSubmit(): void {
//     this.authService.login(this.username, this.password).subscribe(
//       (response) => {
//         // Store token or user info
//         this.authService.setToken(response.token);
//         this.router.navigate(['/home']);
//       },
//       (error) => {
//         console.error('Login error:', error);
//       }
//     );
//   }
// }
