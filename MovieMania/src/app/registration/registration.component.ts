import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';
  username: string = '';
  role: string = 'general';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    const registrationData = {
      email: this.email,
      password: this.password,
      username: this.username,
      role: this.role
    };

    // Make the HTTP POST request to the registration endpoint
    this.http.post('http://127.0.0.1:5000/register', registrationData).subscribe(
      () => {
        // Registration successful, redirect to the login page
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('Error registering user:', error);
        // Handle error and display appropriate message if needed
      }
    );
  }
}
