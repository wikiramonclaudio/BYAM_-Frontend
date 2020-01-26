import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, MetaDefinition, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  public sectionTitle: string;
  translate: TranslateService;
  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta,
    public translationService: TranslationService
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
    this.translate = this.translationService.getTranslateService();
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
