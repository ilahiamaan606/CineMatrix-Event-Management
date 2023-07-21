import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MovieMania';
  storedData: any;

  ngOnInit(): void {
    // Retrieve data from local storage
    this.storedData = localStorage.getItem('name'); // Replace 'key' with the actual key used to store the data
    this.storedData = JSON.parse(this.storedData);

    // Parse the data if it's in JSON format
    if (this.storedData) {
      this.storedData = JSON.parse(this.storedData);
    }

    // Now you can use the data in your component
    console.log(this.storedData);
  }
}
