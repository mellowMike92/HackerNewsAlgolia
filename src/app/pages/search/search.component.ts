import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchResults, SearchService } from 'src/app/services/searchService.component';
interface SearchType {
  value: string;
  viewValue: string;
}
interface SearchRelevance {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css', '../../app.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  ng_searchBar: string;
  searchType: SearchType[] = [
    { value: 'story-0', viewValue: 'Story' },
    { value: 'author-1', viewValue: 'Author' }
  ];
  searchRelevance: SearchRelevance[] = [
    { value: 'relevance-0', viewValue: 'Relevance' },
    { value: 'recent-1', viewValue: 'Most Recent' }
  ];
  SelectedType = this.searchType[0].value;
  SelectedRelevance = this.searchRelevance[0].value;
  alphabeticalResults = "0";
  hitsInPage: number = 10;
  totalHits: number = 100;
  pageNumbers = [1, 2, 3];
  pageNumber: string = "0";
  searchHistory: Array<string> = [];
  searchTime: Array<string> = [];
  results = new Observable<SearchResults>();
  results2: SearchResults = <SearchResults>{};
  results3 = new BehaviorSubject(<SearchResults>{});
  constructor(
    private searchService: SearchService,
  ) {
    this.ng_searchBar = ""
    this.pageNumbers = Array(50).fill(50).map((x, i) => i); // [0,1,2,3,4]
  }

  ngOnInit(): void {
    this.SelectedType = this.searchType[0].value;
    this.SelectedRelevance = this.searchRelevance[0].value;
    this.results = this.searchService.getAllStories();
    this.results.subscribe(data => {
      this.results2 = data;
      this.results3.next(data);
      (window as any).hits = this.results2;
    });
  }
  SortAlphabetically(event: Event) {
    this.alphabeticalResults = (event.target as HTMLSelectElement).value;
    this.onSearchBarChange(this.pageNumber);

    if (this.alphabeticalResults == "1") {
      this.results2.hits = this.results2.hits.sort((a, b) => (a.title > b.title) ? 1 : -1);
      this.results3.next(this.results2);
    }
    else if (this.alphabeticalResults == "2") {
      this.results2.hits = this.results2.hits.sort((a, b) => (a.title < b.title) ? 1 : -1);
      this.results3.next(this.results2);
    }
    else {

    }
  }
  onSearchBarChange(pageNumber?: string) {
    console.log(this.ng_searchBar);

    if (this.SelectedRelevance == "relevance-0") {
      if (this.SelectedType == "story-0") {
        this.searchService.GetStoriesByRelevance(this.ng_searchBar,);
        this.results = this.searchService.getStoriesByRelevance(this.ng_searchBar, pageNumber);
      }
      else {
        this.searchService.GetAuthorsByRelevance(this.ng_searchBar);
        this.results = this.searchService.getAuthorsByRelevance(this.ng_searchBar, pageNumber);
      }
    }
    else {
      if (this.SelectedType == "story-0") {
        this.searchService.GetStoriesByRecent(this.ng_searchBar);
        this.results = this.searchService.getStoriesByRecent(this.ng_searchBar, pageNumber);
      }
      else {
        this.searchService.GetAuthorsByRecent(this.ng_searchBar);
        this.results = this.searchService.getAuthorsByRecent(this.ng_searchBar, pageNumber);
      }
    }
    this.results.subscribe(data => {
      this.results2 = data;
      if (this.alphabeticalResults == "1") {
        this.results2.hits = this.results2.hits.sort((a, b) => (a.title > b.title) ? 1 : -1);
        this.results3.next(this.results2);
      }
      else if (this.alphabeticalResults == "2") {
        this.results2.hits = this.results2.hits.sort((a, b) => (a.title < b.title) ? 1 : -1);
        this.results3.next(this.results2);
      }
      else {

      }
      this.results3.next(this.results2);
      this.pageNumbers = Array(this.results2.nbPages).fill(this.results2.nbPages).map((x, i) => i); // [0,1,2,3,4]
      this.hitsInPage = this.results2.hitsPerPage;
      this.totalHits = this.results2.nbHits;
    });

  }

  afterSearchBarChange() {
    this.searchHistory.push(this.ng_searchBar);
    this.searchTime.push(formatDate(new Date(), 'hh:mm a - MM/dd/yyyy', 'en'));
    this.saveToHistory();
  }
  saveToHistory() {
    localStorage.setItem("searchHistory", JSON.stringify(this.searchHistory));
    localStorage.setItem("searchTime", JSON.stringify(this.searchTime));
  }
  previousPage() {

    this.pageNumber = (parseInt(this.pageNumber) - 1).toString();
    this.onSearchBarChange(this.pageNumber);
  }
  nextPage() {
    this.pageNumber = (parseInt(this.pageNumber) + 1).toString();
    this.onSearchBarChange(this.pageNumber);
  }
  goToPage(event: Event) {
    if (event.target != null) {
      this.pageNumber = (event.target as HTMLSpanElement).id;
    }
    this.onSearchBarChange(this.pageNumber);
  }

  ngOnDestroy() {
    this.results3.unsubscribe();
  }
}