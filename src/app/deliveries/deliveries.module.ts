import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveriesComponent } from './deliveries.component';
import { NavigationService } from '../services/navigation.service';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [DeliveriesComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,

    ],
    providers: [NavigationService],
    exports: [DeliveriesComponent]
    })
export class DeliveriesModule { }
