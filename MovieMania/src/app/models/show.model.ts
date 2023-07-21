// src/app/models/show.model.ts

export interface Show {
    _id: string;
    movieId: string; // This will store the ID of the associated movie
    showTime: string;
    seatAvailability: number;
    // Add other properties as needed for the show details
  }
  