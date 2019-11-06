
import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';

import { DoctorService, UserService } from 'src/app/services/service.index';
import { UploadModalService } from 'src/app/components/upload-window/upload-modal.service';
// import swal from 'sweetalert';

declare var swal: any;

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[] = []
  doctor: Doctor;
  from: number = 0;
  loading: Boolean = false;
  totalDoctors: number = 0;
  constructor(
    public doctorService: DoctorService,
    public userService: UserService,
    public uploadModalService: UploadModalService
  ) { }

  ngOnInit() {
    this.loadDoctors();
    this.uploadModalService.notification.subscribe(
      response=>{        
        this.loadDoctors();
      }
    )
  }

  showModal(id: string){
    this.uploadModalService.showModal('doctors', id);
  }

  loadDoctors(){
    this.loading = true;
    this.doctorService.getDoctors().subscribe(
      response=>{
        console.log(response);
        this.doctors = response.doctors;
        this.totalDoctors = response.total;        
        this.loading = false;
      }
    )
  }

  changeFrom(value: number){
    let from = this.from + value;    
    if(from>= this.totalDoctors){
      return;
    }
    if(from<0){
      return;
    }
    this.from += value;
    this.loadDoctors();
  }

  searchDoctor(term: string){
    if(term.length<=0){
      this.loadDoctors();
      return;
    }
    this.loading = true;
    this.doctorService.searchDoctor(term).subscribe(
      (doctors: Doctor[])=>{
        this.doctors = doctors;
        this.totalDoctors = doctors.length;
        this.loading = false;
      }, error=>{
        console.log(error);
      }
    )
  }

  deleteDoctor(doctor:Doctor){

    swal({
      title: "Estás seguro?",
      text: "Estas a punto de borrar el doctor " + doctor.name,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
       this.doctorService.deleteDoctor(doctor._id, localStorage.getItem('token')).subscribe(
         (response: any)=>{           
           swal('Doctor eliminado correctamente!', response.doctor.name, 'success');
           this.loadDoctors();
         }
       )
      } 
    });
  }

  updateDoctor(doctor: Doctor){
    this.doctorService.updateDoctor(doctor).subscribe(
      response=>{
        console.log(response);
      }
    );
  }

  createDoctor(doctor: Doctor){
    swal({
      title: 'Crear doctor',
      text: 'Introduce el nombre del doctor',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((valor:string)=>{
      if(!valor || valor.length == 0){
        return;
      }
      let newDoctor = new Doctor(valor, JSON.parse(localStorage.getItem('user')), this.doctor.hospital);
      this.doctorService.createDoctor(newDoctor, localStorage.getItem('token')).subscribe(
        response=>{
          this.loadDoctors();
        }
      )
    });
  }

}
