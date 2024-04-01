import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { Observable, map, startWith } from 'rxjs'
import { FirebaseService } from 'src/app/common-components/services/firebase.service'
import { IDishCategoryDetails } from 'src/app/interfaces'

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent implements OnInit {
  @Input() dishCategoriesData: IDishCategoryDetails[] = []
  @Output() onDishesCompleted = new EventEmitter<{ data: any }>()
  @Output() onBackClicked = new EventEmitter<boolean>()
  filteredOptions: Observable<IDishCategoryDetails[]> | undefined
  uploadedImage: File | null = null
  currentFileUpload?: any
  imageUrl = ''

  dishFormGroup = new FormGroup({
    dish: new FormArray([
      new FormGroup({
        dishCategory: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        price: new FormControl(0, Validators.required),
        image: new FormControl('', Validators.required),
        calories: new FormControl(0, Validators.required),
        addons: new FormArray([
          new FormGroup({
            name: new FormControl('', Validators.required),
            price: new FormControl(0, Validators.required),
            checked: new FormControl(false),
          }),
        ]),
        size: new FormArray([
          new FormGroup({
            name: new FormControl('', Validators.required),
            price: new FormControl(0, Validators.required),
          }),
        ]),
      }),
    ]),
  })

  constructor(private fileUploadService: FirebaseService) {}

  ngOnInit(): void {
    console.log(this.dishCategoriesData)
    console.log(this.dishControls.controls)
    // this.filteredOptions = (this.dishFormGroup.get('dish') as FormArray).get('dishCategory').valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    // );
    this.filteredOptions = (
      this.dishFormGroup.get('dish') as FormArray
    ).valueChanges.pipe(
      startWith(''),
      map((dishes) => {
        return dishes.map((dish: { dishCategory: any }) => dish.dishCategory)
      }),
      map((categories) => this._filter(categories || [])),
    )
  }

  private _filter(value: string): IDishCategoryDetails[] {
    const filterValue = value.toLowerCase()

    return this.dishCategoriesData.filter((option) =>
      option.name.toLowerCase().includes(filterValue),
    )
  }

  onFilesUploaded(files: File[]) {
    if (files.length > 0) {
      this.uploadedImage = files[0]
      this.currentFileUpload = {
        name: files[0].name,
        file: files[0] as File,
      }
      this.fileUploadService
        .publishFileToStorage(this.currentFileUpload)
        .then((downloadURL: string) => {
          // Handle successful upload
          this.imageUrl = downloadURL
        })
        .catch((error) => {
          // Handle error
          console.error('Error uploading file:', error)
        })
    }
  }

  onNext() {
    // this.onDishesCompleted.emit({
    //   data: '3',
    // })
  }

  removeImage() {
    this.uploadedImage = null
  }

  onBack() {
    this.onBackClicked.emit(true)
  }

  addDish() {
    this.dishControls.push(
      new FormGroup({
        dishCategory: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        price: new FormControl(0, Validators.required),
        image: new FormControl('', Validators.required),
        calories: new FormControl(0, Validators.required),
        addons: new FormArray([
          new FormGroup({
            name: new FormControl('', Validators.required),
            price: new FormControl(0, Validators.required),
            checked: new FormControl(false),
          }),
        ]),
        size: new FormArray([
          new FormGroup({
            name: new FormControl('', Validators.required),
            price: new FormControl(0, Validators.required),
          }),
        ]),
      }),
    )
  }

  addAddon(index: number) {
    const addonsFormArray = (this.dishFormGroup.get('dish') as FormArray)
      .at(index)
      .get('addons') as FormArray
    addonsFormArray.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        price: new FormControl(0, Validators.required),
        checked: new FormControl(false),
      }),
    )
  }

  addSize(index: number) {
    const sizesFormArray = (this.dishFormGroup.get('dish') as FormArray)
      .at(index)
      .get('size') as FormArray
    sizesFormArray.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        price: new FormControl(0, Validators.required),
      }),
    )
  }

  removeAddon(dishIndex: number, addonIndex: number) {
    const addonsFormArray = (this.dishFormGroup.get('dish') as FormArray)
      .at(dishIndex)
      .get('addons') as FormArray
    addonsFormArray.removeAt(addonIndex)
  }

  removeSize(dishIndex: number, sizeIndex: number) {
    const sizesFormArray = (this.dishFormGroup.get('dish') as FormArray)
      .at(dishIndex)
      .get('size') as FormArray
    sizesFormArray.removeAt(sizeIndex)
  }

  removeDish(index: number) {
    const dishFormArray = this.dishFormGroup.get('dish') as FormArray
    dishFormArray.removeAt(index)
  }

  get dishControls(): FormArray {
    return this.dishFormGroup.get('dish') as FormArray
  }
  getSizeControls(index: number): FormArray {
    return (this.dishFormGroup.get('dish') as FormArray)
      .at(index)
      .get('size') as FormArray
  }
  getDishCategoryControl(index: number): FormControl {
    return (this.dishFormGroup.get('dish') as FormArray)
      .at(index)
      .get('dishCategory') as FormControl
  }
}
