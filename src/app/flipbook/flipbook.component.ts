import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FlipbookService } from '../flipbook.service';

@Component({
  selector: 'app-flipbook',
  standalone: false,
  templateUrl: './flipbook.component.html',
  styleUrl: './flipbook.component.css'
})
export class FlipbookComponent implements AfterViewInit {

  @ViewChild('flipbook', { static: false }) flipContainer!: ElementRef;

  constructor(private flipbookService: FlipbookService) { }

  ngAfterViewInit(): void {
    this.flipbookService.initFlipbook(this.flipContainer);
  }

  Previous(): void {
    this.flipbookService.flipPrev();
  }

  Next(): void {
    this.flipbookService.flipNext();
  }
}
