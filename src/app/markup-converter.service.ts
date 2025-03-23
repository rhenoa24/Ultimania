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

    // Convert lists properly
    text = text.replace(/(?:^|\n)- (.*)/g, '<li>$1</li>'); // Convert `- item` to `<li>item</li>`
    text = text.replace(/(?:<\/li>\s*)+(?=<li>)/g, ''); // Remove any gaps between `<li>` items
    text = text.replace(/<li>.*?<\/li>/gs, '<ul>$&</ul>'); // Wrap `<li>` elements inside `<ul>`, but only once

    // Replace `[Name] "Dialog text"` but avoid interfering with line breaks
    text = text.replace(/\[([^\]]+)\]\s*"([^"]+)"/g, '{{DIALOG|$1|$2}}');

    // Preserve paragraph breaks (except inside lists and dialogs)
    text = text
      .split(/\n\s*\n/) // Detect double newlines as paragraph breaks
      .map(para => (para.match(/^<h[1-3]>|^<ul>|^{{DIALOG/) ? para : `<p>${para}</p>`)) // Wrap in <p> unless it's a heading, list, or dialog
      .join('');

    return text;
  }


}
