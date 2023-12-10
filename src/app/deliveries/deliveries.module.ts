import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveriesComponent } from './deliveries.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [DeliveriesComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [DeliveriesComponent]
    })
export class DeliveriesModule { }
