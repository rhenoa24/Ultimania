import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FlipbookService } from '../flipbook.service';

@Component({
  selector: 'app-flipbook',
  standalone: false,
  templateUrl: './flipbook.component.html',
  styleUrl: './flipbook.component.css'
})
export class FlipbookComponent implements AfterViewInit {

  pageIds: string[] = [];
  totalPages: number = 3;

  constructor() {
    // Manually filling the array with page IDs
    for (let i = 0; i < this.totalPages; i++) {
      this.pageIds.push('page' + (i + 1));
    }
  }

  //@ViewChild('flipbook', { static: false }) flipContainer!: ElementRef;

  //constructor(private flipbookService: FlipbookService) { }

  ngAfterViewInit(): void {
    //this.flipbookService.initFlipbook(this.flipContainer);
  }

  //Previous(): void {
  //  this.flipbookService.flipPrev();
  //}

  //Next(): void {
  //  this.flipbookService.flipNext();
  //}
}
