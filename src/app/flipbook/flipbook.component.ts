import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flipbook',
  standalone: false,
  templateUrl: './flipbook.component.html',
  styleUrl: './flipbook.component.css'
})
export class FlipbookComponent implements OnInit, AfterViewInit {
  pages: { front?: string; back?: string; cover?: string; frontCover?: boolean }[] = [];
  zIndices: number[] = [];

  flippedStates: boolean[] = [];

  ngOnInit(): void {
    // Define your pages
    this.pages = [
      { cover: 'green-cover.jpg', frontCover: true },
      { front: 'test.txt', back: 'test.txt' },
      { front: 'test.txt', back: 'test.txt' },
      { front: 'test.txt', back: 'test.txt' },
      { front: 'test.txt', back: 'test.txt' },
      { front: 'test.txt', back: 'test.txt' },
      { front: 'test.txt', back: 'test.txt' },
      { cover: 'green-cover.jpg' }
    ];

    // Assign z-index values (starting from highest)
    const totalPages = this.pages.length;
    for (let i = 0; i < totalPages; i++) {
      const zIndexValue = totalPages - i + 1;
      this.zIndices.push(zIndexValue);
    }

  }

  ngAfterViewInit(): void {
    //const flipSound = new Audio('./audio/slide-book.wav');

    //// Simulate a user interaction
    //const simulatedClick = new MouseEvent('click', { bubbles: true, cancelable: true });
    //document.body.dispatchEvent(simulatedClick);

    //// Now try to play the sound after the simulated user interaction
    //flipSound.play().catch(function (error) {
    //  console.error('Audio play failed', error);
    //});
  }

  isCooldown = false;

  handleFlip(pageIndex: number, isFlipped: boolean): void {
    if (this.isCooldown) return;

    // Start cooldown
    this.isCooldown = true;
    setTimeout(() => {
      this.isCooldown = false;
    }, 500);

    // Immediately update z-index
    const highestZIndex = Math.max(...this.zIndices);
    this.zIndices[pageIndex] = highestZIndex + 1;

    this.flippedStates[pageIndex] = isFlipped;
    this.checkAllPagesFlipped();

    //console.log(this.flippedStates);
  }

  onFirstPage = true;
  onLastPage = false;

  // Helper method to check if all pages are flipped
  checkAllPagesFlipped(): void {
    this.onFirstPage = false;
    this.onLastPage = false;

    if (this.flippedStates[0] === false || this.flippedStates.length === 0) {
      this.onFirstPage = true; //First Page not yet flipped
    }
    if (this.flippedStates[this.pages.length - 1] === true) {
      this.onLastPage = true; //Last Page has been flipped
    }
  }


}
