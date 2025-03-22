import { Component, ElementRef, ViewChild } from '@angular/core';
import { PageFlip } from 'page-flip';

@Component({
  selector: 'app-flipbook',
  standalone: false,
  templateUrl: './flipbook.component.html',
  styleUrl: './flipbook.component.css'
})
export class FlipbookComponent {

  @ViewChild('flipbook', { static: false }) flipContainer!: ElementRef;
  private pageFlip!: PageFlip;

  ngAfterViewInit(): void {
    this.pageFlip = new PageFlip(this.flipContainer.nativeElement, {
      width: 400, // Base page width
      height: 600, // Base page height
      maxShadowOpacity: 0.5, // Shadow opacity
      showCover: true,
    });

    this.pageFlip.loadFromHTML(document.querySelectorAll('.page'));
  }

}
