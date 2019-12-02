import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ServerErrorMessagesComponent } from './components/server-error-messages/server-error-messages.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from "primeng/calendar";
import { IMaskModule } from "angular-imask";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AccordionModule } from 'primeng/accordion';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule } from 'primeng/paginator';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { PickListModule } from 'primeng/picklist';
import { DropdownModule } from 'primeng/dropdown';
import { InputPadraoComponent } from './components/input-padrao/input-padrao.component';
import { ColocaPrimeiroCaptularPipe } from './service/coloca-primeiro-captular.pipe';
import { EditorModule } from 'primeng/editor';
import { CKEditorModule } from 'ckeditor4-angular';
import { QuillModule } from 'ngx-quill';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmationService } from 'primeng/api';
import { TextareaPadraoComponent } from './components/textarea-padrao/textarea-padrao.component';
import { ListboxModule } from 'primeng/listbox';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MaskMoneyPipe } from './service/mask-money.pipe';

@NgModule({
  declarations: [
    FormFieldErrorComponent, 
    ServerErrorMessagesComponent,
    PageHeaderComponent,
    BreadCrumbComponent,
    InputPadraoComponent,
    ColocaPrimeiroCaptularPipe,
    TextareaPadraoComponent,
    MaskMoneyPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    RadioButtonModule,
    CalendarModule,
    IMaskModule,
    ConfirmDialogModule,
    AngularFontAwesomeModule,
    ToastModule,
    DynamicDialogModule,
    DialogModule,
    AccordionModule,
    CheckboxModule,
    PaginatorModule,
    MultiSelectModule,
    SplitButtonModule,
    ToggleButtonModule,
    PickListModule,
    DropdownModule,
    EditorModule,
    CKEditorModule,
    QuillModule,
    TabViewModule,
    ListboxModule,
    ScrollPanelModule,
    OverlayPanelModule
  ],
  exports: [
    //shared modules
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    RadioButtonModule,
    CalendarModule,
    IMaskModule,
    ConfirmDialogModule,
    AngularFontAwesomeModule,
    ToastModule,
    DynamicDialogModule,
    DialogModule,
    AccordionModule,
    CheckboxModule,
    PaginatorModule,
    MultiSelectModule,
    SplitButtonModule,
    ToggleButtonModule,
    PickListModule,
    DropdownModule,
    EditorModule,
    CKEditorModule,
    QuillModule,  
    TabViewModule,
    ListboxModule,
    ScrollPanelModule,
    OverlayPanelModule,

    //shared components
    FormFieldErrorComponent,
    PageHeaderComponent,
    ServerErrorMessagesComponent,
    BreadCrumbComponent,
    InputPadraoComponent,
    ColocaPrimeiroCaptularPipe,
    TextareaPadraoComponent,
    MaskMoneyPipe
  ],
  providers: [
    ConfirmationService
  ]
})
export class SharedModule { }
