import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', 
})
export class WindowService {
  get nativeWindow(): Window | undefined {
    return typeof window !== 'undefined' ? window : undefined;
  }
}
