import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-deliviriesform',
  templateUrl: './deliviriesform.component.html',
  styleUrls: ['./deliviriesform.component.css']
})
export class DeliviriesformComponent implements OnInit {

    ngOnInit(): void {
    }
    clientlist = [];
  
    deliveriesForm = new FormGroup({
      title: new FormControl('', Validators.required),
      num: new FormControl('', [Validators.required, Validators.minLength(8)]),
      clientlist: new FormControl([], Validators.required),
    });
  
    constructor() { }
    
    submit(): void {}

    
}
