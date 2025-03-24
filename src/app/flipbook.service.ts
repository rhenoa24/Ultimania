import { Injectable, ElementRef } from '@angular/core';
import { PageFlip } from 'page-flip';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlipbookService {
  private pageFlip!: PageFlip;
  private initialized = new BehaviorSubject<boolean>(false);

  constructor() { }

  // Initialize PageFlip
  initFlipbook(container: ElementRef) {
    this.pageFlip = new PageFlip(container.nativeElement, {
      width: 700,
      height: 800,
      autoSize: true,
      minWidth: 315,
      maxWidth: 1000,
      minHeight: 420,
      maxHeight: 1350,
      maxShadowOpacity: 0.5,
      showCover: true,
      mobileScrollSupport: false
    });

    this.pageFlip.loadFromHTML(container.nativeElement.querySelectorAll('.page'));
    this.initialized.next(true);
  }

  // Flip to the previous page
  flipPrev(): void {
    if (this.pageFlip) {
      this.pageFlip.flipPrev();
    }
  }

  // Flip to the next page
  flipNext(): void {
    if (this.pageFlip) {
      this.pageFlip.flipNext();
    }
  }

  // Check if the flipbook is initialized
  isInitialized() {
    return this.initialized.asObservable();
  }
}
