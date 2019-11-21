import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { HttpExtCacheResponse } from '@http-ext/plugin-cache';

@Component({
  styles: [
    `
      .is-from-cache {
        color: grey;
      }
    `
  ],
  template: `
    <ul>
      <li *ngFor="let book of bookList$ | async">
        <a
          [class.is-from-cache]="isFromCache$ | async"
          [routerLink]="['/book', book.id]"
          >{{ book.volumeInfo.title }}</a
        >
      </li>
    </ul>
  `
})
export class BookListComponent {
  bookList$: Observable<any[]>;
  isFromCache$: Observable<boolean>;

  constructor(private _httpClient: HttpClient) {
    const request$ = this._httpClient
      .get<HttpExtCacheResponse<any>>(
        'https://www.googleapis.com/books/v1/volumes?q=extreme%20programming'
      )
      .pipe(shareReplay({ refCount: true, bufferSize: 1 }));

    this.bookList$ = request$.pipe(map(body => body.data.items));
    this.isFromCache$ = request$.pipe(
      map(body => body.cacheMetadata.isFromCache)
    );
  }
}