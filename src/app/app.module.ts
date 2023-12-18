import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './components/header-component/header.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MainComponent } from './components/main/main.component'
import { MaterialModule } from './material.module'
import { FooterComponent } from '../../src/app/components/footer/footer.component'
import { MainContentComponent } from './components/main-content/main-content.component'
import { HttpClientModule } from '@angular/common/http'
import { NotFoundComponent } from './components/not-found/not-found.component'

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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
