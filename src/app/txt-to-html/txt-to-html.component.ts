import { Component, Input, OnChanges, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { MarkupConverterService } from '../markup-converter.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'txt-to-html',
  standalone: false,
  templateUrl: './txt-to-html.component.html',
  styleUrl: './txt-to-html.component.css'
})
export class TxtToHtmlComponent {

  @Input() filename: string = ''; // User now only provides the filename
  private basePath = 'txt/'; // Auto-prefix path

  textContent: string = '';

  @ViewChild('dynamicContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(
    private markupService: MarkupConverterService,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnChanges() {
    if (this.filename) {
      const fullPath = `${this.basePath}${this.filename}`;
      this.markupService.getTextFile(fullPath).subscribe(content => {
        this.textContent = content;
        this.renderHtml();
      });
    }
  }

  renderHtml() {
    // Clear previous dynamic components
    this.container.clear();

    // Replace `[Name] "Dialog"` with markers
    let parsedHtml = this.textContent.replace(/\[([^\]]+)\]\s*"([^"]+)"/g, (match, name, dialog) => {
      return `<dialog-box-placeholder name="${name}" dialog="${dialog}"></dialog-box-placeholder>`;
    });

    // Split by <dialog-box-placeholder> to handle both static and dynamic parts
    const fragments = parsedHtml.split(/<dialog-box-placeholder name="([^"]+)" dialog="([^"]+)"><\/dialog-box-placeholder>/g);

    fragments.forEach((fragment, index) => {
      if (index % 3 === 0) {
        // Normal HTML part
        const textNode = document.createElement('div');
        textNode.innerHTML = fragment;
        this.container.element.nativeElement.appendChild(textNode);
      } else {
        // DialogBoxComponent
        const factory = this.resolver.resolveComponentFactory(DialogBoxComponent);
        const componentRef = this.container.createComponent(factory);
        componentRef.instance.name = fragments[index];
        componentRef.instance.dialog = fragments[index + 1];
      }
    });
  }
  
}
