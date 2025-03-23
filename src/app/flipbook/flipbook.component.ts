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
      width: 800, // base page width
      height: 800, // base page height
      //size: "stretch" as any,
      minWidth: 315,
      maxWidth: 1000,
      minHeight: 420,
      maxHeight: 1350,
      maxShadowOpacity: 0.5, // Half shadow intensity
      showCover: true,
      mobileScrollSupport: false // disable content scrolling on mobile devices
    });


    this.pageFlip.loadFromHTML(document.querySelectorAll('.page'));
  }

  protected Previous(): void {
    this.pageFlip.flipPrev();
  }

  protected Next(): void {
    this.pageFlip.flipNext();
  }

}

