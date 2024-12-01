import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { BlockUIModule } from 'primeng/blockui';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { MessagesModule } from 'primeng/messages';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { CarouselModule } from 'primeng/carousel';
import {CalendarModule} from 'primeng/calendar';
import {FieldsetModule} from "primeng/fieldset";
import {SidebarModule} from 'primeng/sidebar';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';


@NgModule( {
  declarations: [],
  imports: [
    InputTextModule,
    ButtonModule,
    DropdownModule,
    MessageModule,
    CheckboxModule,
    BlockUIModule,
    AutoCompleteModule,
    DialogModule,
    DynamicDialogModule,
    InputMaskModule,
    MessagesModule,
    RadioButtonModule,
    ProgressSpinnerModule,
    CarouselModule,
    CalendarModule,
    FieldsetModule,
    SidebarModule,
    TabMenuModule,
    TableModule,
    DialogModule,
    ToastModule,
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CheckboxModule,
    MessageModule,
    BlockUIModule,
    AutoCompleteModule,
    DialogModule,
    DynamicDialogModule,
    InputMaskModule,
    MessagesModule,
    RadioButtonModule,
    ProgressSpinnerModule,
    CarouselModule,
    CalendarModule,
    FieldsetModule,
    SidebarModule,
    TabMenuModule,
    TableModule,
    DialogModule,
    ToastModule,
  ],
  providers: []
} )

export class FormSharedModule {
  static forRoot() {
    return {
      ngModule: FormSharedModule,
      providers: []
    };
  }
}
