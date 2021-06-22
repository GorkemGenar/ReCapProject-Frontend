import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  Colors:Color[]=[];
  currentColor:Color;
  emptyColor:Color;

  constructor(private colorServie:ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorServie.getColors().subscribe(response =>{
      this.Colors = response.data;
    })
  }

  setCurrentColor(color:Color){
    this.currentColor = color;
  }

  dischargeCurrentColor(){
    this.currentColor = this.emptyColor;
  }

  getCurrentColorClass(color:Color){
    if(color == this.currentColor){
      return "list-group-item active";
    }
    else{
      return "list-group-item";
    }
  }

  getAllColorClass(){
    if(!this.currentColor){
      return "list-group-item active";
    }
    else{
      return "list-group-item";
    }
  }

}
