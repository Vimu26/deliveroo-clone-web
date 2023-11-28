import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  isButtonClicked = false;
  isButton2Clicked = false;
  @ViewChild('buttonRef', { static: true }) buttonRef!: ElementRef;
  @ViewChild('button2Ref', { static: true }) button2Ref!: ElementRef;

  constructor(private renderer: Renderer2) {}

  onButtonClick(): void {
    this.isButtonClicked = !this.isButtonClicked;
  }
  onButton2Click(): void {
    this.isButton2Clicked = !this.isButton2Clicked;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any): void {
    if (
      this.buttonRef &&
      this.buttonRef.nativeElement &&
      !this.buttonRef.nativeElement.contains(event?.target)
    ) {
      this.isButtonClicked = false;
    }

    else if (
      this.button2Ref &&
      this.button2Ref.nativeElement &&
      !this.button2Ref.nativeElement.contains(event?.target)
    ) {
      this.isButton2Clicked = false;
    }
  }
}
