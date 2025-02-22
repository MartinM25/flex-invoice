import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'flex-invoice';

  onClear() {
    console.log('Button clicked!');
  };

  onDone() {
    console.log('Button clicked!');
  }
}
