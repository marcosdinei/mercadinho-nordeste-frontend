import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ListComponent {
  @Input() dataSource!: any[];
  @Input() columns!: Column[];
  columnsWithExpand!: Column[];
  attributes: string[] = [];
  expandedElement!: any;

  ngOnInit(): void {
    this.columnsWithExpand = [...this.columns, {attribute:'expand', name: ''}];
    this.columnsWithExpand.forEach(el => this.attributes.push(el.attribute));
  }
}

interface Column {
  attribute: string,
  name: string
}
