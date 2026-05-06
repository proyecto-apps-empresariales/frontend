import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-field',
  imports: [CommonModule],
  templateUrl: './file-field.html',
  styleUrl: './file-field.css',
})
export class FileField {
  @Input() accept: string = '*';
  @Input() multiple: boolean = true;
  @Output() filesDropped = new EventEmitter<File[]>();

  isDragging = false;
  files: File[] = []; // ← agrega

  @HostListener('dragover', ['$event'])
  onDragOver(e: DragEvent) { e.preventDefault(); this.isDragging = true; }

  @HostListener('dragleave', ['$event'])
  onDragLeave(e: DragEvent) { e.preventDefault(); this.isDragging = false; }

  @HostListener('drop', ['$event'])
  onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragging = false;
    const files = Array.from(e.dataTransfer?.files ?? []);
    if (files.length) this.handleFiles(files);
  }

  onFileInput(e: Event) {
    const files = Array.from((e.target as HTMLInputElement).files ?? []);
    if (files.length) this.handleFiles(files);
  }

  private handleFiles(files: File[]) {
    this.files = this.multiple ? [...this.files, ...files] : [files[0]];
    this.filesDropped.emit(this.files);
  }

  removeFile(index: number) {
    this.files = this.files.filter((_, i) => i !== index);
    this.filesDropped.emit(this.files);
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  openPicker(input: HTMLInputElement) { input.click(); }
}