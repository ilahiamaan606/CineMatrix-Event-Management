// src/app/movie-list.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  loading = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.loading = true;
    this.http.get<Movie[]>('http://127.0.0.1:5000/movies').subscribe(
      (data) => {
        this.movies = data;
        this.loading = false;
      },
      (error) => {
        console.log('Error fetching movies:', error);
        this.loading = false;
      }
    );
  }
}
