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

  // Create an array of filenames dynamically using a loop
  private flipSounds: string[] = [];

  ngOnInit(): void {
    // Generate filenames for flip sounds
    for (let i = 1; i <= 12; i++) {
      this.flipSounds.push(`/audio/flip-(${i}).wav`);
    }
  }

  protected pageFlip(): void {
    this.isFlipped = !this.isFlipped;
    this.cdr.detectChanges();
    this.isFlippedChanged.emit(this.isFlipped);

    // Select a random flip sound from the array
    const randomIndex = Math.floor(Math.random() * this.flipSounds.length);
    const flipSound = new Audio(this.flipSounds[randomIndex]);

    // Play the selected flip sound
    flipSound.play().catch(function (error) {
      console.error('Audio play failed', error);
    });
  }

}
