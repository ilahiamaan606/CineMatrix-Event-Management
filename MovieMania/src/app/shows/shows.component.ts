import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.model';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css'],
  animations: [
    trigger('bookAnimation', [
      state('initial', style({
        transform: 'scale(1)',
      })),
      state('clicked', style({
        transform: 'scale(1.2)',
      })),
      transition('initial <=> clicked', animate('200ms ease-in-out')),
    ]),
  ],
})



export class ShowsComponent implements OnInit {
  movieId!: string;
  movie!: Movie;
  loading = false;
  seatRows!: number[][];
  selectedSeats: string[] = [];
  mymovie:  Movie | null = null;
  showToast: boolean = false;



  constructor(private route: ActivatedRoute, private http: HttpClient,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.getMovieDetails();
    });
  }
  

  getMovieDetails(): void {
    this.loading = true;
    this.http.get<Movie>('http://127.0.0.1:5000/movies/' + this.movieId).subscribe(
      (data) => {
        this.movie = data;
        this.loading = false;
        // Initialize the seatRows array with mock seat data (0: available, 1: booked, 2: selected)
        this.initializeSeatRows();
      },
      (error) => {
        console.log('Error fetching movie details:', error);
        this.loading = false;
      }
    );
  }

  initializeSeatRows(): void {
    // Mock data for the seat booking diagram (Assuming 5 rows and 10 seats per row)
    this.seatRows = [];
    const numRows = 5;
    const seatsPerRow = 10;
    for (let i = 0; i < numRows; i++) {
      const rowSeats = new Array(seatsPerRow).fill(0); // All seats are initially available (0)
      this.seatRows.push(rowSeats);
    }
  }

  selectSeat(row: number, seat: number): void {
    if (this.seatRows[row][seat] === 0) {
      // Seat is available, select it
      this.seatRows[row][seat] = 2; // 2 represents "selected"
      this.selectedSeats.push(`${row + 1}${String.fromCharCode(65 + seat)}`);
    } else if (this.seatRows[row][seat] === 2) {
      // Seat is already selected, unselect it
      this.seatRows[row][seat] = 0; // 0 represents "available"
      const seatIndex = this.selectedSeats.indexOf(`${row + 1}${String.fromCharCode(65 + seat)}`);
      if (seatIndex !== -1) {
        this.selectedSeats.splice(seatIndex, 1);
      }
    }
  }
  
  getRandomTime(timeSlot:any) {
    let startTime, endTime;
  
    if (timeSlot === 'morning') {
      startTime = new Date();
      startTime.setHours(6, 0, 0, 0); // 6:00 AM
      endTime = new Date();
      endTime.setHours(12, 0, 0, 0); // 12:00 PM
    } else if (timeSlot === 'evening') {
      startTime = new Date();
      startTime.setHours(12, 0, 0, 0); // 12:00 PM
      endTime = new Date();
      endTime.setHours(22, 0, 0, 0); // 10:00 PM
    } else {
      throw new Error('Invalid time slot. Use "morning" or "evening".');
    }
  
    const randomTime = new Date(startTime.getTime() + Math.random() * (endTime.getTime() - startTime.getTime()));
    return randomTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  getFormattedDate(offset: number): string {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + offset);
    return currentDate.toISOString().slice(0, 10);
  }

  bookShow(show: any, movie:any) {
    // Get the user email from local storage
    const email = localStorage.getItem('email');

    if (!email) {
      console.error('Email not found in local storage.');
      return;
    }

    // Create the data object to send in the POST request
    const data = {
      email: email,
      movie: this.movie,
      show: show,
    };

    // Make the POST request to the backend API
    this.http.post<any>('http://127.0.0.1:5000/book', data).subscribe(
      (response) => {
        // Handle the response if needed
        console.log('Booking successful:', response);
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 3000);

      },
      (error) => {
        // Handle errors if any
        console.error('Error while booking:', error);
      }
    );
  }

  shows = [
    { id: 1, date: this.getFormattedDate(0), time: 'Morning', seatsAvailable: Math.floor(Math.random() * 50) + 1, duration: this.getRandomTime("morning")},
    { id: 2, date: this.getFormattedDate(0), time: 'Evening', seatsAvailable: Math.floor(Math.random() * 50) + 1,duration: this.getRandomTime("evening") },
    { id: 3, date: this.getFormattedDate(1), time: 'Morning', seatsAvailable: Math.floor(Math.random() * 50) + 1,duration: this.getRandomTime("morning") },
    { id: 4, date: this.getFormattedDate(1), time: 'Evening', seatsAvailable: Math.floor(Math.random() * 50) + 1,duration: this.getRandomTime("evening") },
    { id: 5, date: this.getFormattedDate(2), time: 'Morning', seatsAvailable: Math.floor(Math.random() * 50) + 1 ,duration: this.getRandomTime("morning")},
    { id: 6, date: this.getFormattedDate(2), time: 'Evening', seatsAvailable: Math.floor(Math.random() * 50) + 1 ,duration: this.getRandomTime("evening")},
  ];

  

}
