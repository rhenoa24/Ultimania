import { Component, Input, OnInit } from '@angular/core';
import { MarkupConverterService } from '../markup-converter.service';

@Component({
  selector: 'txt-to-html',
  standalone: false,
  templateUrl: './txt-to-html.component.html',
  styleUrl: './txt-to-html.component.css'
})
export class TxtToHtmlComponent {

  @Input() filename: string = ''; // User now only provides the filename
  private basePath = 'txt/'; // Auto-prefix path
  textContent: string = '';

  constructor(private markupService: MarkupConverterService) { }

  ngOnChanges() {
    if (this.filename) {
      const fullPath = `${this.basePath}${this.filename}`;
      this.markupService.getTextFile(fullPath).subscribe(content => {
        this.textContent = content;
      });
    }
  }

}
