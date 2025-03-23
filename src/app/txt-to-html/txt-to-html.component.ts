import { Component, Input, OnChanges, ViewChild, ViewContainerRef, ComponentRef, Renderer2 } from '@angular/core';
import { MarkupConverterService } from '../markup-converter.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'txt-to-html',
  template: `
    <div #contentContainer></div>
  `,
  standalone: false,
  styleUrls: ['./txt-to-html.component.css']
})
export class TxtToHtmlComponent implements OnChanges {
  @Input() filename: string = '';
  private basePath = 'txt/';

  @ViewChild('contentContainer', { read: ViewContainerRef, static: true }) contentContainer!: ViewContainerRef;

  constructor(
    private markupService: MarkupConverterService, private renderer: Renderer2
  ) { }

  ngOnChanges() {
    if (this.filename) {
      const fullPath = `${this.basePath}${this.filename}`;
      this.markupService.getTextFile(fullPath).subscribe(content => {
        this.renderContent(content);
      });
    }
  }

  private renderContent(markup: string) {
    this.contentContainer.clear();

    const fragments = markup.split(/({{DIALOG\|[^}]+}})/g);

    for (const fragment of fragments) {
      const match = fragment.match(/{{DIALOG\|([^|]+)\|([^}]+)}}/);
      if (match) {
        const dialogRef: ComponentRef<DialogBoxComponent> = this.contentContainer.createComponent(DialogBoxComponent);
        dialogRef.instance.name = match[1];
        dialogRef.instance.dialog = match[2];
      } else {
        const sanitizedText = fragment.trim().replace(/\n/g, '<br/>');
        if (sanitizedText) {
          this.contentContainer.element.nativeElement.insertAdjacentHTML('beforeend', sanitizedText);
        }
      }
    }
  }

}
