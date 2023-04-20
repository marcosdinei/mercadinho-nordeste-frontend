import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';

import { Pagination } from '../../model/api-response';

@Injectable()
class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();
  firstPageLabel = `Primeira página`;
  itemsPerPageLabel = `Itens por página:`;
  lastPageLabel = `Última página`;
  nextPageLabel = 'Próxima página';
  previousPageLabel = 'Página anterior';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Página 1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Página ${page + 1} de ${amountPages}`;
  }
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl},
  ]
})
export class PaginationComponent {
  @Input() pagination!: Pagination;
  @Output() page = new EventEmitter<number>();

  changePage(event: PageEvent) {
    this.page.emit(event.pageIndex);
  }
}
