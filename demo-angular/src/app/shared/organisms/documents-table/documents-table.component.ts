import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentItemComponent } from "../../molecules/document-item/document-item.component";

export interface TableColumn<T> {
  header: string;        // título de la columna
  field: keyof T;        // campo del objeto
  transform?: (val: any) => string; // formateador opcional
}

@Component({
  selector: 'app-documents-table',
  standalone: true,
  imports: [CommonModule, DocumentItemComponent],
  templateUrl: './documents-table.component.html',
  styleUrls: ['./documents-table.component.css'],
})
export class DocumentsTableComponent<T> {
  @Input() title: string = '';
  @Input() total: number = 0;
  @Input() items: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
  @Input() isDocument:boolean = true;

  getValue(item: T, col: TableColumn<T>): string {
    const val = item[col.field];
    return col.transform ? col.transform(val) : String(val ?? '');
  }
}