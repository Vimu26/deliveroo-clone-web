import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class MenuCommunicationService {
  private selectedCategoryIndexSubject = new Subject<number>()
  selectedCategoryIndex$ = this.selectedCategoryIndexSubject.asObservable()

  setSelectedCategoryIndex(index: number) {
    this.selectedCategoryIndexSubject.next(index)
  }
}
