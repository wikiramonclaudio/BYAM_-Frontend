import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';
import { UploadModalService } from 'src/app/components/upload-window/upload-modal.service';
// import swal from 'sweetalert';

declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = []
  from: number = 0;
  loading: Boolean = false;
  totalUsers: number = 0;
  constructor(
    public userService: UserService,
    public uploadModalService: UploadModalService
  ) { }

  ngOnInit() {
    this.loadUsers();
    this.uploadModalService.notification.subscribe(
      response=>{        
        this.loadUsers();
      }
    )
  }

  showModal(id: string){
    this.uploadModalService.showModal('users', id);
  }

  loadUsers(){
    this.loading = true;
    this.userService.getUsers(this.from).subscribe(
      response=>{
        this.users = response.users;
        this.totalUsers = response.total;        
        this.loading = false;
      }
    )
  }

  changeFrom(value: number){
    let from = this.from + value;    
    if(from>= this.totalUsers){
      return;
    }
    if(from<0){
      return;
    }
    this.from += value;
    this.loadUsers();
  }

  searchUser(term: string){
    if(term.length<=0){
      this.loadUsers();
      return;
    }
    this.loading = true;
    this.userService.searchUser(term).subscribe(
      (users: User[])=>{
        this.users = users;
        this.loading = false;
      }, error=>{
        console.log(error);
      }
    )
  }

  deleteUser(user:User){
    if(user._id == this.userService.user._id){
      swal('No puedes borrar este usuario', 'No puedes borrarte a ti mismo', 'error');
      return;
    }

    swal({
      title: "Estás seguro?",
      text: "Estas a punto de borrar a " + user.name,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
       this.userService.deleteUser(user._id).subscribe(
         (response: any)=>{           
           swal('Usuario eliminado correctamente!', response.user.name, 'success');
           this.loadUsers();
         }
       )
      } 
    });
  }

  updateUser(user: User){
    this.userService.updateUser(user).subscribe(
      response=>{
        console.log(response);
      }
    );
  }

}
