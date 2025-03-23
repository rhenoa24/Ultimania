import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarkupConverterService {
  private filePath = '/txt/test.txt'; // Correct path

  constructor(private http: HttpClient) { }

  getTextFile(): Observable<string> {
    return this.http.get(this.filePath, { responseType: 'text' }).pipe(
      map(text => this.applyBasicMarkup(text))
    );
  }

  private applyBasicMarkup(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold: **text**
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic: __text__
      .replace(/\n/g, '<br>'); // New line to <br>
  }
}
