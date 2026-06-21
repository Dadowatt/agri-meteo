import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestMeteo } from "./components/test-meteo/test-meteo";

@Component({
  selector: 'app-root',
  imports: [TestMeteo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('agri-meteo');
}
