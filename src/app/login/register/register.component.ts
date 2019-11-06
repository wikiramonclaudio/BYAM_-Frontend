import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UserService } from 'src/app/services/service.index';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

declare function initPlugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login.component.css']
})
export class RegisterComponent implements OnInit {

  public formG: FormGroup;

  constructor(
    public userService: UserService,
    public router: Router
  ) { 
    
  }

  ngOnInit() {
    initPlugins();
    this.formG = new FormGroup({
      name: new FormControl( null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl( null, Validators.required ),
      conditions: new FormControl(false),
    },
    { validators: this.comparePassword('password', 'password2') }   
    );

    // this.formG.setValue({
    //   name: 'test',
    //   email: 'test@test.com',
    //   password: '1234',
    //   password2: '1234',
    //   conditions: true
    // });
  }

  comparePassword(pass1: string, pass2: string){
    return (group: FormGroup)=>{
      let campo1 = group.controls[pass1].value;
      let campo2 = group.controls[pass2].value;

      if(campo1 === campo2){
        return null;
      }
      return {
        passEquals: true
      }
    }
  }
  
  register(){
    
    if(this.formG.invalid){
      return;
    }

    if(!this.formG.value.conditions){      
      swal("Importante", "Debes aceptar las condiciones!", "warning");
      return;
    }

    let user = new User(
      this.formG.value.name,
      this.formG.value.email,
      this.formG.value.password
    );

    this.userService.createUser(user)
    .subscribe(response=>{     
      this.router.navigate(['/login']);
      return;
    },
    error=>{
      swal("Error", "Error al guardar el usuario!", "error");
    });


    
  }

}
