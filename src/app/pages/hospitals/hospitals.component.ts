import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService, UserService } from 'src/app/services/service.index';
import { UploadModalService } from 'src/app/components/upload-window/upload-modal.service';
// import swal from 'sweetalert';

declare var swal: any;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[] = []
  hospital: Hospital;
  from: number = 0;
  loading: Boolean = false;
  totalHospitals: number = 0;
  constructor(
    public hospitalService: HospitalService,
    public userService: UserService,
    public uploadModalService: UploadModalService
  ) { }

  ngOnInit() {
    this.loadHospitals();
    this.uploadModalService.notification.subscribe(
      response=>{        
        this.loadHospitals();
      }
    )
  }

  showModal(id: string){
    this.uploadModalService.showModal('hospitals', id);
  }

  loadHospitals(){
    this.loading = true;
    this.hospitalService.getHospitals().subscribe(
      response=>{        
        this.hospitals = response.hospitals;
        this.totalHospitals = response.total;        
        this.loading = false;
      }
    )
  }

  changeFrom(value: number){
    let from = this.from + value;    
    if(from>= this.totalHospitals){
      return;
    }
    if(from<0){
      return;
    }
    this.from += value;
    this.loadHospitals();
  }

  searchHospital(term: string){
    if(term.length<=0){
      this.loadHospitals();
      return;
    }
    this.loading = true;
    this.hospitalService.searchHospital(term).subscribe(
      (hospitals: Hospital[])=>{
        this.hospitals = hospitals;
        this.loading = false;
      }, error=>{
        console.log(error);
      }
    )
  }

  deleteHospital(hospital:Hospital){
    // if(hospital._id == this.hospitalService.hospital._id){
    //   swal('No puedes borrar este usuario', 'No puedes borrarte a ti mismo', 'error');
    //   return;
    // }

    swal({
      title: "Estás seguro?",
      text: "Estas a punto de borrar el hospital " + hospital.name,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
       this.hospitalService.deleteHospital(hospital._id, localStorage.getItem('token')).subscribe(
         (response: any)=>{           
           swal('Hospital eliminado correctamente!', response.hospital.name, 'success');
           this.loadHospitals();
         }
       )
      } 
    });
  }

  updateHospital(hospital: Hospital){
    this.hospitalService.updateHospital(hospital).subscribe(
      response=>{
        console.log(response);
      }
    );
  }

  createHospital(hospital: Hospital){
    swal({
      title: 'Crear hospital',
      text: 'Introduce el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((valor:string)=>{
      if(!valor || valor.length == 0){
        return;
      }
      let newHospital = new Hospital(valor, JSON.parse(localStorage.getItem('user')));
      this.hospitalService.createHospital(newHospital, localStorage.getItem('token')).subscribe(
        response=>{
          this.loadHospitals();
        }
      )
    });
  }

}
