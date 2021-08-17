import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validator, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm: FormGroup

  constructor(private formBuilder:FormBuilder,
              private colorService:ColorService,
              private toastrService:ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.createColorAddForm()
  }
  
  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName:["", Validators.required]
    })
  }

  addColor(){    
    if(this.colorAddForm.valid)
    {
      let colorModel = Object.assign({}, this.colorAddForm.value)
      this.colorService.addColor(colorModel).subscribe(data =>{
        this.toastrService.success(data.message, "Başarılı")
        this.router.navigate(["color/list"]);
      },responseError =>{
        if(responseError.error.ValidationErrors.length>0){
          console.log(responseError.error.ValidationErrors);
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")
          }         
        }
      })
    }
    else{
      this.toastrService.error("Girilen bilgileri kontrol edin.", "Dikkat")
      this.toastrService.clear();
    }
  }

}
