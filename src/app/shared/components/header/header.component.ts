import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { map, Observable, share, timer } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatIconModule]
})
export class HeaderComponent {
  currentDate$!: Observable<Date>;

  ngOnInit(): void {
    this.currentDate$ = timer(0, 1000).pipe(
      map(() => new Date),
      share()
    );
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  }
}
