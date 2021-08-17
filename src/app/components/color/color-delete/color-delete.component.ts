import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-delete',
  templateUrl: './color-delete.component.html',
  styleUrls: ['./color-delete.component.css']
})
export class ColorDeleteComponent implements OnInit {

  colorId:number
  color:Color={colorId:0, colorName:""}
  colorDeleteForm:FormGroup

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
    this.createColorDeleteForm()
  }

  getColorById(){
    this.colorService.getColorById(this.colorId).subscribe(response =>{
      this.color = response.data
      this.createColorDeleteForm();
    })
  }

  createColorDeleteForm(){   
    this.colorDeleteForm = this.formBuilder.group({
      colorId:[this.color.colorId],
      colorName:[this.color.colorName, Validators.required]
    })
  }

  deleteColor(){
    if(this.colorDeleteForm.valid){
      let colorModel = this.colorDeleteForm.value
      this.colorService.deleteColor(colorModel).subscribe(response =>{
        this.toastrService.success(response.message, "Başarılı")
        this.router.navigate(["/color/list"])
      },responseError =>{
        if(responseError.error.ValidationErrors.length > 0){
          console.log(responseError.error.ValidationErrors);
          for (let i  = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")           
          }          
        }
      })
    }
    else{
      this.toastrService.error("Bilgiler kontrol edin.", "Hatalı Bilgi")
    }   
  }

}
