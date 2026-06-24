import {
  Component,
  EventEmitter,
  Output,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-carte-senegal',
  imports: [],
  templateUrl: './carte-senegal.html',
  styleUrl: './carte-senegal.css',
})
export class CarteSenegal implements AfterViewInit {

  @Output()
  regionSelectionnee = new EventEmitter<string>();

  regionSurvolee = '';

  tooltipVisible = false;

  tooltipX = 0;
  tooltipY = 0;

  deplacerTooltip(event: MouseEvent){

  this.tooltipX = event.clientX + 15;

  this.tooltipY = event.clientY + 15;

}

  @ViewChild('svgContainer')
  svgContainer!: ElementRef<HTMLDivElement>;

  private regionActive: SVGElement | null = null;

  ngAfterViewInit(): void {

    fetch('/maps/senegal.svg')
      .then(response => response.text())
      .then(svg => {

        this.svgContainer.nativeElement.innerHTML = svg;

        this.initialiserCarte();

      })
      .catch(error => {
        console.error('Erreur chargement SVG', error);
      });

  }

  private initialiserCarte(): void {

    const regions =
      this.svgContainer.nativeElement.querySelectorAll(
        'path[name]'
      );

    regions.forEach((region) => {

      const path = region as SVGPathElement;

      path.style.cursor = 'pointer';
      path.style.transition = 'all .2s ease';

      path.addEventListener('mouseenter', () => {

        const nom =
          path.getAttribute('name');

        if (nom) {

          this.regionSurvolee = nom;

          this.tooltipVisible = true;

        }

        if (!path.classList.contains('selected-region')) {

          path.style.fill = '#ffb703';

        }

      });

      path.addEventListener('mouseleave', () => {

        if (!path.classList.contains('selected-region')) {
          path.style.fill = '#6f9c76';
        }

      });

      path.addEventListener('click', () => {

        const nomRegion = path.getAttribute('name');

        if (!nomRegion) return;

        const regionNormalisee =
          this.normaliserRegion(nomRegion);

        this.selectionnerRegion(
          path,
          regionNormalisee
        );

      });

      path.addEventListener('mouseleave', () => {

      this.tooltipVisible = false;

      if (!path.classList.contains('selected-region')) {

        path.style.fill = '#6f9c76';

      }

    });

    });

  }
  
  private selectionnerRegion(
    element: SVGElement,
    region: string
  ): void {

    if (this.regionActive) {

      this.regionActive.classList.remove(
        'selected-region'
      );

      (this.regionActive as SVGPathElement).style.fill =
        '#6f9c76';

    }

    element.classList.add(
      'selected-region'
    );

    (element as SVGPathElement).style.fill =
      '#ff4500';

    this.regionActive = element;

    this.regionSelectionnee.emit(region);

  }

  private normaliserRegion(
    region: string
  ): string {

    return region
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, '-');

  }

}