import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css', '../../app.component.css']
})
export class HistoryComponent implements OnInit {
  Object = Object;
  constructor() { }
  searchHistory: string[] = JSON.parse(localStorage.searchHistory);
  searchTime: string[] = JSON.parse(localStorage.searchTime);
  ngOnInit(): void {
  }

}
