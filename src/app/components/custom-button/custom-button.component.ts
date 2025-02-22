import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.css'
})
export class CustomButtonComponent {
  @Input() backgroundColor: string = '#1976d2';
  @Input() text: string = 'Click Me';
  @Output() action = new EventEmitter<void>();

  handleClick() {
    this.action.emit();
  }

}
