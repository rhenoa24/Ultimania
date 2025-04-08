import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flipbook',
  standalone: false,
  templateUrl: './flipbook.component.html',
  styleUrl: './flipbook.component.css'
})
export class FlipbookComponent implements OnInit {
  pages: { front: string; back: string }[] = [];
  zIndices: number[] = [];

  ngOnInit(): void {
    // Define your pages
    this.pages = [
      { front: 'test.txt', back: 'test.txt' },
      { front: 'test.txt', back: 'test.txt' },
      { front: 'test.txt', back: 'test.txt' }
    ];

    // Assign z-index values (starting from highest)
    const totalPages = this.pages.length;
    for (let i = 0; i < totalPages; i++) {
      const zIndexValue = totalPages - i + 1;
      this.zIndices.push(zIndexValue);
    }
  }

  handleFlip(pageIndex: number): void {
    // Get the current maximum z-index
    let highestZIndex = 0;
    for (let i = 0; i < this.zIndices.length; i++) {
      if (this.zIndices[i] > highestZIndex) {
        highestZIndex = this.zIndices[i];
      }
    }

    // Bring the flipped page to the front
    this.zIndices[pageIndex] = highestZIndex + 1;
  }
}
