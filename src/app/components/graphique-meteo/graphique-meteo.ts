import { Component, Input, AfterViewInit, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { DonneeGraphique } from '../../modeles/donnee-graphique.model';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-graphique-meteo',
  templateUrl: './graphique-meteo.html',
  styleUrl: './graphique-meteo.css',
})
export class GraphiqueMeteo implements AfterViewInit, OnChanges {

  @Input() historique: DonneeGraphique[] = [];

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;

  ngAfterViewInit(): void {
    this.creerGraphique();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['historique'] && this.canvas) {
      this.creerGraphique();
    }
  }

  creerGraphique(): void {

    if (!this.canvas) return;

    const labels = this.historique.map(item => item.jour);
    const data = this.historique.map(item => item.temperature);

    // détruire ancien chart si existant
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Température (°C)',
            data: data,
            borderColor: '#FF4500',
            backgroundColor: 'rgba(255, 69, 0, 0.2)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
  }
}