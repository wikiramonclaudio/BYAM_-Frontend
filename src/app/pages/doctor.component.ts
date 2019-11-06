import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../models/hospital.model';
import { HospitalService, DoctorService, UserService } from '../services/service.index';
import { Doctor } from '../models/doctor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadModalService } from '../components/upload-window/upload-modal.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  hospitals: Hospital[] = [];
  doctor: Doctor = new Doctor('', '', '', '', '');
  selectedHosp: Hospital = new Hospital('', '');

  constructor(
    public hospitalService: HospitalService,
    public userService: UserService,
    public doctorService: DoctorService,
    public router: Router,
    private route: ActivatedRoute,
    private modalUploadService: UploadModalService
  ) { }

  ngOnInit() {
    this.modalUploadService.notification.subscribe(
      response=>{        
        this.doctor = response.doctor;
      }
    );
    let doctorId = this.route.snapshot.paramMap.get('id');
    this.getDoctor(doctorId);
    this.getHospitals();    
  }

  getDoctor(id: string){
    this.doctorService.getDoctor(id).subscribe(
      response=>{        
        this.doctor = response.doctor;
        this.changeHospital(this.doctor.hospital);
      }
    );
  }

  getHospitals(){
    this.hospitalService.getHospitals().subscribe(
      response => {
        this.hospitals = response.hospitals;
      }
    );

  }

  changeHospital(hospId: string){
    this.hospitalService.getHospital(hospId).subscribe(
      (response: any) =>{        
        this.selectedHosp = response.hospital;        
      }
    );
  }

  saveDoctor(f: NgForm) {
    if(f.invalid)
      return;
    let data = f.form.value;
    if(this.doctor._id){
      this.doctorService.updateDoctor(this.doctor).subscribe(
        response=>{
          swal("Doctor actualizado", this.doctor.name, "success");
        }
      );
    }else{
      let newDoctor = new Doctor(data.name, this.userService.user._id, data.hospital);        
      this.doctorService.createDoctor(newDoctor, this.userService.token).subscribe(
        response => {        
          this.doctor._id =  response._id;
            this.router.navigate(['/doctor', response._id]);
        }
      );    
    }
  }

  changePicture(){
    this.modalUploadService.showModal('doctors', this.doctor._id);
  }

}
