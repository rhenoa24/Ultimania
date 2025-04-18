import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'flip-page',
  standalone: false,
  templateUrl: './flippage.component.html',
  styleUrl: './flippage.component.css'
})
export class FlippageComponent {
  @Input() Front?: string = '';
  @Input() Back?: string = '';

  @Input() Cover?: string = '';
  @Input() FrontCover?: boolean = false;

  protected isFlipped: boolean = false;
  @Output() isFlippedChanged = new EventEmitter<boolean>();

  @Input() onFirstPage?: boolean = true;
  @Input() onLastPage?: boolean = true;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  // Create an array of filenames dynamically using a loop
  private flipSounds: string[] = [];

  ngOnInit(): void {
    // Generate filenames for flip sounds
    for (let i = 1; i <= 12; i++) {
      this.flipSounds.push(`./audio/flip-(${i}).wav`);
    }

  }

  protected pageFlip(): void {
    this.isFlipped = !this.isFlipped;
    this.cdr.detectChanges();
    this.isFlippedChanged.emit(this.isFlipped);

    if (!this.Cover) {
      // Select a random flip sound from the array
      const randomIndex = Math.floor(Math.random() * this.flipSounds.length);
      const flipSound = new Audio(this.flipSounds[randomIndex]);

      // Play the selected flip sound
      flipSound.play().catch(function (error) {
        console.error('Audio play failed', error);
      });
    }

    if (this.Cover) {

      //Front Cover
      if (this.FrontCover === true) {
        if (this.isFlipped === true) {
          const flipSound = new Audio('./audio/cover-open.wav');
          flipSound.play().catch(function (error) {
            console.error('Audio play failed', error);
          });
        }
        else {
          const flipSound = new Audio('./audio/cover-close.wav');
          flipSound.play().catch(function (error) {
            console.error('Audio play failed', error);
          });
        }
      }

      //Back Cover
      else {
        if (this.isFlipped === true) {
          const flipSound = new Audio('./audio/cover-close.wav');
          flipSound.play().catch(function (error) {
            console.error('Audio play failed', error);
          });
        }
        else {
          const flipSound = new Audio('./audio/cover-open.wav');
          flipSound.play().catch(function (error) {
            console.error('Audio play failed', error);
          });
        }
      }

    }

  }

}
