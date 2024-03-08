import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-detail.component.html',
  styleUrl: './image-detail.component.css'
})
export class ImageDetailComponent {
  @Input() images?: string[];
  @Input() thisImage?: string;

  handleChangimage(url: string) {
    this.thisImage = url
  }

}
