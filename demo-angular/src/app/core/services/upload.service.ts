import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private cloudName = 'dlooadalj';
  private uploadPreset = 'docuCBM_public';

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    return this.http
      .post<any>(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/auto/upload`,
        formData
      )
      .pipe(map((res) => res.secure_url));
  }
}