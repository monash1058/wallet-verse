import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SafePipe } from './pipes/safe-pipe';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { TransferModalComponent } from './components/transfer-modal/transfer-modal.component';



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    TransferModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    })
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    ToastrModule,
    TransferModalComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class SharedModule { }
