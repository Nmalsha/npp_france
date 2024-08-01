import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-user-space',
  templateUrl: './user-space.component.html',
  styleUrl: './user-space.component.css',
})
export class UserSpaceComponent implements OnInit {
  users: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
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
