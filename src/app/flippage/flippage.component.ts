import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'flip-page',
  standalone: false,
  templateUrl: './flippage.component.html',
  styleUrl: './flippage.component.css'
})
export class FlippageComponent {
  @Input() Front: string = '';
  @Input() Back: string = '';
  @Output() isFlippedChanged = new EventEmitter<boolean>();

  protected isFlipped: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  protected pageFlip(): void {
    this.isFlipped = !this.isFlipped;
    this.cdr.detectChanges();
    this.isFlippedChanged.emit(this.isFlipped);
  }

}
