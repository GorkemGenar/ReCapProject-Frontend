import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  color:Color={colorId:0, colorName:""}
  colorId:number
  colorName:string
  colorUpdateForm:FormGroup

  constructor(private colorService:ColorService,
              private activatedRoute:ActivatedRoute,
              private router: Router,
              private formBuilder:FormBuilder,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["colorId"]){
        this.colorId=(params['colorId']) 
      }
    }) 
    this.getColorById()
    this.createColorUpdateForm()
  }

  getColorById(){
    this.colorService.getColorById(this.colorId).subscribe(response =>{
      this.color = response.data
      this.createColorUpdateForm()
    })
  }
  
  createColorUpdateForm(){   
    this.colorUpdateForm = this.formBuilder.group({
      colorId:[this.color.colorId],
      colorName:[this.color.colorName, Validators.required]
    })
  }

  updateColor(){
    if(this.colorUpdateForm.valid){
      let colorModel  = this.colorUpdateForm.value
      console.log(colorModel);
      this.colorService.updateColor(colorModel).subscribe(response =>{
        this.toastrService.success(response.message, "Başarılı")
        this.router.navigate(["/color/list"]);
      },responseError =>{
        if(responseError.error.ValidationErrors.length > 0){
          console.log(responseError.error.ValidationErrors);
          for (let i  = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")           
          }          
        }
      });
    }
    else{
      this.toastrService.error("Girilen bilgileri kontrol edin.", "Hatalı Bilgi")
    }
  }
}
