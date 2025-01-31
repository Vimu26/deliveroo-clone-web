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
import {
  DishAddOns,
  IDish,
  IDishCategoryDetails,
  IDishData,
  Size,
} from 'src/app/interfaces'
import { AddEditRestaurantService } from '../../services/add-edit-restaurant.service'
import { ScrollToTopService } from 'src/app/services/scroll-to-top.service'

export interface DishImages {
  image: string | undefined
  dishIndex: number
}
@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent implements OnInit {
  @Input() dishCategoriesData: IDishCategoryDetails[] = []
  @Input() dishesData: IDishData[] = []
  @Output() onDishesCompleted = new EventEmitter<{ data: IDishData[] }>()
  @Output() onBackClicked = new EventEmitter<boolean>()
  filteredOptions: Observable<IDishCategoryDetails[]> | undefined
  uploadedImage: File | null = null
  currentFileUpload?: any
  imageUrl = ''
  dishImages: DishImages[] = []
  isDetailsValid = false

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

  constructor(
    private fileUploadService: FirebaseService,
    private addEditRestaurantService: AddEditRestaurantService,
    private scrollToTopService: ScrollToTopService,
  ) {}

  ngOnInit(): void {
    this.scrollToTopService.scrollToTop()
    this.filteredOptions = (
      this.dishFormGroup.get('dish') as FormArray
    ).valueChanges.pipe(
      startWith(''),
      map((dishes) => {
        return dishes.map((dish: { dishCategory: any }) => dish.dishCategory)
      }),
      map((categories) => this._filter(categories || [])),
    )

    if (this.dishesData) {
      //form generating part without values
      for (let i = 0; i < this.dishesData.length; i++) {
        if (i !== 0) this.addDish()
        for (let j = 1; j < this.dishesData[i].addOns.length; j++) {
          this.addAddon(i)
        }
        for (let k = 1; k < this.dishesData[i].size.length; k++) {
          this.addSize(i)
        }
      }
      //patching values for the generated forms
      const dishArray = this.dishFormGroup.controls.dish as FormArray
      this.dishesData.forEach((dish, index) => {
        ;(dishArray.at(index) as FormGroup).patchValue({
          dishCategory: dish.dish_category,
          name: dish.name,
          description: dish.description,
          price: dish.price,
          image: dish.image,
          calories: dish.calories,
        })
        const addonsArray = dishArray.at(index).get('addons') as FormArray
        dish.addOns.forEach((addOn, j) => {
          ;(addonsArray.at(j) as FormGroup).patchValue({
            name: addOn.name,
            price: addOn.price,
            checked: addOn.checked,
          })
        })
        const sizeArray = dishArray.at(index).get('size') as FormArray
        dish.size.forEach((size, k) => {
          ;(sizeArray.at(k) as FormGroup).patchValue({
            name: size.name,
            price: size.price,
          })
        })
      })
    }
  }

  private _filter(value: string): IDishCategoryDetails[] {
    const filterValue = value.toLowerCase()

    return this.dishCategoriesData.filter((option) =>
      option.name.toLowerCase().includes(filterValue),
    )
  }

  onFilesUploaded(files: File[], dishIndex: number) {
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
          this.dishImages.push({
            image: downloadURL,
            dishIndex: dishIndex,
          })
          const dishFormArray = this.dishFormGroup.get('dish') as FormArray
          const dishFormGroup = dishFormArray.at(dishIndex) as FormGroup
          dishFormGroup.get('image')?.setValue(downloadURL)
        })
        .catch((error) => {
          // Handle error
          console.error('Error uploading file:', error)
        })
    }
  }

  getDishData(): IDishData[] {
    const dishFormArray = this.dishFormGroup.get('dish')?.value || []
    return dishFormArray.map((dishFormGroup) => {
      const addOns: DishAddOns[] = dishFormGroup.addons.map(
        (addOnFormGroup) => ({
          name: addOnFormGroup?.name ?? '',
          price: addOnFormGroup?.price ?? 0,
          checked: addOnFormGroup?.checked ?? false,
        }),
      )
      const sizes: Size[] = dishFormGroup.size.map((sizeFormGroup) => ({
        name: sizeFormGroup.name ?? '',
        price: sizeFormGroup.price ?? 0,
      }))
      return {
        dish_category: dishFormGroup.dishCategory ?? '',
        name: dishFormGroup.name ?? '',
        price: dishFormGroup.price ?? 0,
        image: dishFormGroup.image ?? '',
        calories: dishFormGroup.calories ?? 0,
        description: dishFormGroup.description ?? '',
        addOns: addOns,
        size: sizes,
      }
    })
  }

  onNext() {
    for (let dish of this.getDishData()) {
      this.addEditRestaurantService.checkDishes(dish).subscribe({
        next: (res: any) => {
          if (res.code === 201)
            this.onDishesCompleted.emit({ data: this.getDishData() })
          this.isDetailsValid = true
        },
        error(err) {
          console.log(err)
        },
      })
    }
  }

  async removeImage(index: number): Promise<void> {
    const imageToRemove = this.dishImages.find(
      (dishImage) => dishImage.dishIndex === index,
    )
    if (imageToRemove) {
      try {
        await this.fileUploadService.deleteFile(imageToRemove?.image ?? '')
        const indexToRemove = this.dishImages.indexOf(imageToRemove)
        if (indexToRemove !== -1) {
          this.dishImages.splice(indexToRemove, 1)
        }
      } catch (error) {
        console.log(error)
      }
    }
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

  getAddonsControl(index: number): FormArray {
    return (this.dishFormGroup.get('dish') as FormArray)
      .at(index)
      .get('addons') as FormArray
  }
  getDishCategoryControl(index: number): FormControl {
    return (this.dishFormGroup.get('dish') as FormArray)
      .at(index)
      .get('dishCategory') as FormControl
  }

  findDishImage(index: number) {
    return this.dishImages.find((dishImage) => dishImage.dishIndex === index)
  }
}
