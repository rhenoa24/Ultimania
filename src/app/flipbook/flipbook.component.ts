import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flipbook',
  standalone: false,
  templateUrl: './flipbook.component.html',
  styleUrl: './flipbook.component.css'
})
export class FlipbookComponent implements OnInit {
  pages: { front?: string; back?: string; cover?: string; frontCover?: boolean }[] = [];
  zIndices: number[] = [];

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

  isCooldown = false;

  handleFlip(pageIndex: number): void {
    if (this.isCooldown) return;

    // Start cooldown
    this.isCooldown = true;
    setTimeout(() => {
      this.isCooldown = false;
    },500);

    // Immediately update z-index
    const highestZIndex = Math.max(...this.zIndices);
    this.zIndices[pageIndex] = highestZIndex + 1;
  }

  isCentered = false;



}
