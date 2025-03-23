import { Component, OnInit } from '@angular/core';
import { MarkupConverterService } from '../markup-converter.service';

@Component({
  selector: 'txt-to-html',
  standalone: false,
  templateUrl: './txt-to-html.component.html',
  styleUrl: './txt-to-html.component.css'
})
export class TxtToHtmlComponent implements OnInit {
  textContent: string = '';
  constructor(private markupService: MarkupConverterService) { }

  ngOnInit() {
    this.markupService.getTextFile().subscribe(content => {
      this.textContent = content;
    });
  }
}
