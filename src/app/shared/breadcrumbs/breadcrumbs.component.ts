import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, MetaDefinition, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  public sectionTitle: string;

  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.getRouteData()
      .subscribe(
        data => {          
          this.sectionTitle = data.title;
          this.title.setTitle(this.sectionTitle);

          const metaTag: MetaDefinition = {
            name: 'description',
            content: ' La sección es ---> ' + this.sectionTitle
          };

          this.meta.updateTag(metaTag);
        }
      )
  }

  ngOnInit() {
  }

  getRouteData() {
    return this.router.events
      .pipe(
        filter(evento => evento instanceof ActivationEnd),
        filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
        map((event: ActivationEnd) => {
          return event.snapshot.data;
        })
      );
  }

}
