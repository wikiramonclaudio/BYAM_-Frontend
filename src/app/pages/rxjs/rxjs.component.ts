import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  //control de subscribe y unsubscribe
  subcription: Subscription;

  constructor() {

    this.subcription = this.devuelveObservable().pipe(retry(2)).subscribe(
      (valor: any) => {
        console.log('Subscribe a evento observable .. el número es...> ' + valor);
      },
      error => {
        console.error('error en el OBS, ' + error);
      },
      () => {
        console.log('el observador terminó');
      }
    );
  }

  ngOnInit() {
  }

  devuelveObservable(): Observable<any> {
    return new Observable(
      observer => {
        let contador = 0;
        let intervalo = setInterval(
          () => {
            contador++;
            const salida: any = {
              valor: contador
            };
            observer.next(salida);

            if (contador === 3) {
              observer.complete();
            }
          }, 1000
        )
      }
    ).pipe(
      map((resp: any )=> { return resp.valor; }),
      filter( (valor, index) => {
        console.log('Valor es igual a ' + valor);
        console.log('Es la ' + index + ' vez!');
        if((valor % 2) === 1 )
          return true;
        else 
          return false;
      })
    );
  }

  ngOnDestroy(): void {
   this.subcription.unsubscribe();    
  }

}
