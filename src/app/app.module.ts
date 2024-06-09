import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { AngularFireStorageModule } from '@angular/fire/compat/storage'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './components/header/header.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MainComponent } from './components/pages/landing-component/main/main.component'
import { MaterialModule } from './material.module'
import { FooterComponent } from './components/footer/footer.component'
import { MainContentComponent } from './components/pages/landing-component/main-content/main-content.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NotFoundComponent } from './components/pages/not-found/not-found.component'
import { TokenInterceptor } from './services/token-inteceptor.service'
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker'
import { MatFormFieldModule } from '@angular/material/form-field'

// Import Firebase modules
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { ScrollToTopService } from './services/scroll-to-top.service'
import { NavigationEnd, Router } from '@angular/router'

const firebaseConfig = {
  apiKey: 'AIzaSyCnb6mL7ggQnuLXYNX8zviSHTct3e37q6c',
  authDomain: 'foodie-81a18.firebaseapp.com',
  projectId: 'foodie-81a18',
  storageBucket: 'foodie-81a18.appspot.com',
  messagingSenderId: '1025498188968',
  appId: '1:1025498188968:web:6e1416c11fed02560fc69d',
}

// Initialize Firebase app
const app = initializeApp(firebaseConfig)

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    MainContentComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxMaterialTimepickerModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    ScrollToTopService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private router: Router,
    private scrollService: ScrollToTopService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.scrollService.scrollToTop()
      }
    })
  }
}
function provideStorage(
  arg0: () => import('@firebase/storage').FirebaseStorage,
): any[] | import('@angular/core').Type<any> {
  throw new Error('Function not implemented.')
}
