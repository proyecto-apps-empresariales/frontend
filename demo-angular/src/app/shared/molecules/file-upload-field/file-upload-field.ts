import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileField } from "../../atoms/file-field/file-field";

@Component({
  selector: 'app-file-upload-field',
  imports: [CommonModule, FileField],
  templateUrl: './file-upload-field.html',
  styleUrl: './file-upload-field.css',
})
export class FileUploadField {
   @Input() label: string = 'Archivo';
  @Input() accept: string = '*';
  @Input() multiple: boolean = true;

  files: File[] = [];

  onFilesDropped(newFiles: File[]) {
    this.files = this.multiple
      ? [...this.files, ...newFiles]
      : [newFiles[0]];
  }

  removeFile(index: number) {
    this.files = this.files.filter((_, i) => i !== index);
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
