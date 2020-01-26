import { OptionTypeRelationService } from './../../../services/optionTypeRelation/option-type-relation.service';
import { BetTypeService } from './../../../services/bettype/bet-type.service';
import { BetTypeOption } from './../../../models/bettypeoption';
import { BetType } from './../../../models/bettype.model';
import { Component, OnInit } from '@angular/core';
import { OptionTypeRelation } from 'src/app/models/optiontyperelation';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-create-bet-type',
  templateUrl: './create-bet-type.component.html',
  styleUrls: ['./create-bet-type.component.css']
})
export class CreateBetTypeComponent implements OnInit {
  betTypeOptions: BetTypeOption [] = [];
  selectedOptions: BetTypeOption [] = [];
  betType: BetType = new BetType('', '');
  betTypeOption: BetTypeOption = new BetTypeOption('', '');
  relationsTypeOption: OptionTypeRelation [] = [];
  translate: TranslateService;
  constructor(
    private betTypeService: BetTypeService,
    private optionTypeRelationService: OptionTypeRelationService,
    public translationService: TranslationService
  ) { }

  ngOnInit() {
    this.translate = this.translationService.getTranslateService();
  }
 
  createBetType() {    
    if(this.getSelectedOptions().length<2){
      alert('Obligatorio añadir al menos dos opciones al tipo de apuesta');
    }else{
      this.betTypeService.createBetType(this.betType).subscribe(
        res => {
          this.betType = res;
          // this.saveOptionsBetRelations(res._id);
          // Añadir las opciones seleccionadas a este tipo de apuesta
          this.addBetOptionsToBetType();
          
        }
      )
    }
  }

  addBetOptionsToBetType(){    
    for (let index = 0; index < this.relationsTypeOption.length; index++) {
      if(index == 0)
        this.betType.option1 = this.relationsTypeOption[index].optionbettype;
      else if(index == 1)
        this.betType.option2 = this.relationsTypeOption[index].optionbettype;
      else if(index == 2)
        this.betType.option3 = this.relationsTypeOption[index].optionbettype;
    }
    this.betTypeService.updateBetType(this.betType).subscribe(
      res=>{        
        this.betType = new BetType('');
      }
    )
  }

  createBetTypeOption(){
    this.betTypeService.createBetTypeOption(this.betTypeOption).subscribe(
      res=>{
        console.log('CREADA OPCION PARA TIPO APUESTA', res);
      }
    )
  }

  getOptions(){
     this.betTypeService.getBetOptions().subscribe(
       res=>{
         this.betTypeOptions = res.objectBetTypes;
         console.log('OPCIONES', res);
       }
     )
  }

  toggleSelected(option:any){
    option.selected = !option.selected;
  }

  saveOptions(){
    this.selectedOptions = this.betTypeOptions.filter((el)=>{
      return el.selected == true;
    });    
    this.selectedOptions.forEach((item: any)=>{
      this.relationsTypeOption.push(
        new OptionTypeRelation(item._id, '')
      )
    });
    console.log('Opciones seleccionadas',  this.relationsTypeOption);
  }

  getSelectedOptions(){
    var pepino = this.betTypeOptions.filter((el)=>{
      return el.selected == true;
    });
    return pepino;
  }

  saveOptionsBetRelations(betTypeId: string){
    this.relationsTypeOption.forEach((el)=>{
      el.bettype = betTypeId;
   }); 
   this.optionTypeRelationService.createManyOptionTypeRelations(this.relationsTypeOption).subscribe(
     res=>{
       console.log('ASOCIADAS OPCIONES A LA APUESTA', res);
     }
   )
  }
}
