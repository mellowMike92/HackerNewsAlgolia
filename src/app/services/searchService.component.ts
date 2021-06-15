import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Hits {
  title: string,
  url: string,
  author: string,
  points: number,
  story_text: string,
  comment_text: string,
  _tags: string[],
  num_comments: number,
  objectID: string,
  _highlightResult: {
    title: {
      value: string,
      matchLevel: string,
      matchedWords: string[]
    },
    url: {
      value: string,
      matchLevel: string,
      matchedWords: string[]
    },
    author: {
      value: string,
      matchLevel: string,
      matchedWords: string[]
    }
  }
}

export interface SearchResults {
  hits: Hits[],
  page: number,
  nbHits: number,
  nbPages: number,
  hitsPerPage: number,
  processingTimeMS: number,
  query: string,
  params: string
}
@Injectable({
  providedIn: 'root'
})

export class SearchService {
  constructor(private http: HttpClient) { }
  // searchResults = <SearchResults>{};
  public searchResults: SearchResults[] = []
  url = 'http://hn.algolia.com/api/v1/';
  public currentAPI_url = '';
  getAllStories() {
    this.currentAPI_url = this.url + 'search?query=&tags=story';
    return this.http.get<SearchResults>(this.currentAPI_url);
  }
  GetAllStories() {
    this.getAllStories().subscribe(data => {
      for (const [key, value] of Object.entries(data)) {
        this.searchResults[key as any] = value;
      }
    });
  }
  getAuthorsByRelevance(authorName: string, pageNumber?: string) {
    this.currentAPI_url = this.url + 'search?tags=story,author_' + authorName;
    if (pageNumber != null) {
      this.currentAPI_url += '&page=' + pageNumber;
    }
    return this.http.get<SearchResults>(this.currentAPI_url);
  }
  GetAuthorsByRelevance(authorName: string) {
    this.getAuthorsByRelevance(authorName).subscribe(data => {
      for (const [key, value] of Object.entries(data)) {
        this.searchResults[key as any] = value;
      }
    });
  }
  getAuthorsByRecent(authorName: string, pageNumber?: string) {
    this.currentAPI_url = this.url + 'search_by_date?tags=story,author_' + authorName;
    if (pageNumber != null) {
      this.currentAPI_url += '&page=' + pageNumber;
    }
    return this.http.get<SearchResults>(this.currentAPI_url);
  }
  GetAuthorsByRecent(authorName: string) {
    this.getAuthorsByRecent(authorName).subscribe(data => {
      for (const [key, value] of Object.entries(data)) {
        this.searchResults[key as any] = value;
      }
    });
  }
  getStoriesByRelevance(searchQuery: string, pageNumber?: string) {
    this.currentAPI_url = this.url + 'search?query=' + searchQuery;
    if (pageNumber != null) {
      this.currentAPI_url += '&page=' + pageNumber;
    }
    return this.http.get<SearchResults>(this.currentAPI_url);
  }
  GetStoriesByRelevance(searchQuery: string) {
    this.getStoriesByRelevance(searchQuery).subscribe(data => {
      for (const [key, value] of Object.entries(data)) {
        this.searchResults[key as any] = value;
      }
    });
  }
  getStoriesByRecent(searchQuery: string, pageNumber?: string) {
    this.currentAPI_url = this.url + 'search_by_date?query=' + searchQuery;
    if (pageNumber != null) {
      this.currentAPI_url += '&page=' + pageNumber;
    }
    return this.http.get<SearchResults>(this.url + 'search_by_date?query=' + searchQuery);
  }
  GetStoriesByRecent(searchQuery: string) {
    this.getStoriesByRecent(searchQuery).subscribe(data => {
      for (const [key, value] of Object.entries(data)) {
        this.searchResults[key as any] = value;
      }
    });
  }
}
