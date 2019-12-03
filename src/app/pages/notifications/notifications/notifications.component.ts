import { NotificationCard } from './../../../models/notification.model';
import { NotificationService } from './../../../services/notification/notification.service';
import { UserService } from 'src/app/services/service.index';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notification: NotificationCard = new NotificationCard(false,'','');
  notifications: NotificationCard[] = [];
  users: any [] = [];
  userValues = [];
  constructor(
    public userService: UserService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.userService.getUsers(0).subscribe(
      res=>{
        this.users = res.users;
        this.getNotifications();
        for (let index = 0; index < this.users.length; index++) {
          const element = this.users[index];
          this.userValues[index] = this.users[0]._id;             
        };
      }
    )
  }

  createNotification(){
    console.log(this.notification);
    this.notification.emiter = this.userService.user._id;
    this.notificationService.createNotification(this.notification).subscribe(
      res=>{
        console.log('Notificacion enviada', res);
        // swal("Notificacion enviada correctamente", " ", "success");
      }
    )
  }

  getNotifications(){
    this.notificationService.getNotifications(this.userService.user._id).subscribe(
      res=>{        
        this.notifications = res.notifications;
      }
    )
  }

}
