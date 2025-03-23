import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarkupConverterService {
  constructor(private http: HttpClient) { }

  getTextFile(filePath: string): Observable<string> {
    return this.http.get(filePath, { responseType: 'text' }).pipe(
      map(text => this.applyBasicMarkup(text))
    );
  }

  private applyBasicMarkup(text: string): string {
    // Convert headings
    text = text
      .replace(/^### (.*)$/gm, '<h3>$1</h3>')
      .replace(/^## (.*)$/gm, '<h2>$1</h2>')
      .replace(/^# (.*)$/gm, '<h1>$1</h1>');

    // Convert bold (**text**) and italic (*text*)
    text = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Convert lists properly by wrapping all items in one `<ul>`
    text = text.replace(/(?:^|\n)- (.*)/g, '<li>$1</li>'); // Convert `- item` to `<li>item</li>`
    text = text.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>'); // Wrap `<li>` elements inside `<ul>`

    // Preserve paragraph breaks
    text = text.replace(/\n/g, '<br>');

    // Replace `[Name] "Dialog text"` with a placeholder
    text = text.replace(/\[([^\]]+)\]\s*"([^"]+)"/g, '{{DIALOG|$1|$2}}');

    return text;
  }

}
