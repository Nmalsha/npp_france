import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-space',
  templateUrl: './user-space.component.html',
  styleUrl: './user-space.component.css',
})
export class UserSpaceComponent implements OnInit {
  users: any[] = [];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  navigateToAddUser(): void {
    this.router.navigate(['/admin/signup']);
  }

  loadUsers(): void {
    this.authService.getAllUsers().subscribe((users) => {
      this.users = users;
      console.log('users', users);
    });
  }
  deleteUser(userId: number): void {
    this.authService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
    });
  }
}
