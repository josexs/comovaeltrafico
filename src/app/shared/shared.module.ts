import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MapComponent, RaceItemComponent, SelectorsComponent } from './components';
import { ImagePreloadDirective } from './directives/image-preload.directive';
import { UtilsService, ApiService } from './services';

const components = [MapComponent, RaceItemComponent, SelectorsComponent];
const directives = [ImagePreloadDirective];
const modules = [CommonModule, FormsModule, HttpClientModule];
const services = [ApiService, UtilsService];

@NgModule({
  imports: [...modules],
  exports: [...modules, ...components, ...directives],
  declarations: [...components, ...directives],
  providers: [...services],
})
export class SharedModule {}
