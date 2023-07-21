// profile.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  email: string;
  // Add other properties of the user object here if available
}

interface UserResponse {
  users: User[];
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {
  user: any;
  loading = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Retrieve user email from local storage (assuming you have stored it there during login)
    const userEmail = localStorage.getItem('email');
    console.log(userEmail)

    if (userEmail) {
      this.getUserDetails(userEmail);
    } else {
      console.log('User email not found in local storage');
    }
  }

  getUserDetails(email: string): void {
    this.loading = true;
    // Make a GET request to fetch all users
    this.http.get<UserResponse>('http://127.0.0.1:5000/users').subscribe(
      (response) => {
        console.log('Response:', response);
        // Find the user with the matching email
    
        this.user = response.users.find((user) => user.email === email);
        this.loading = false;
      },
      (error) => {
        console.log('Error fetching users:', error);
        this.loading = false;
      }
    );
  }
  
}
