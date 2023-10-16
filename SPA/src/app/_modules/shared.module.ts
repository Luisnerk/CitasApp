import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { timeout } from 'rxjs';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
      closeButton: true
    })
  ],
  exports:
  [
    BsDropdownModule,
    ToastrModule
  ]
})
export class SharedModule { }
