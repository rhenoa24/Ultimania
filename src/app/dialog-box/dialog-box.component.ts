import { Component, Input } from '@angular/core';

@Component({
  selector: 'dialog-box',
  standalone: false,
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css'
})
export class DialogBoxComponent {
  @Input() name: string = 'Character'; // User now only provides the filename
  @Input() dialog: string = 'blablabla'; // User now only provides the filename

}
