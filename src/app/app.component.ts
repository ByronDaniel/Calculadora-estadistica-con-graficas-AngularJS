import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'estadistica';
  valores = [];

  agregarValores(valor) {
    this.valores.push(valor.value);
    if( valor ) {
      valor.value = "";
    }
    this.valores.sort((a, b) => a - b);
  }

}
