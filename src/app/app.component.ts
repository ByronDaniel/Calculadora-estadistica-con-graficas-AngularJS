import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'estadistica';
  valores = [];
  sumatoria= 0;
  agregarValores(valor){
    this.valores.push(parseInt(valor.value));
    if( valor ) {
      valor.value = "";
    }
    this.valores.sort((a, b) => a - b);
    this.sumatoria=0;
    this.valores.forEach(element => {
      this.sumatoria += element
    });
    console.log(this.sumatoria);
 }

}
