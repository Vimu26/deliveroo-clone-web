import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

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
import { TokenInterceptor } from './services/token-inteceptor.service';

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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
