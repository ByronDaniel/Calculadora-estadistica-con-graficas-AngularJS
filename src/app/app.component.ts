import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'estadistica';
  valoresSinOrden = [];
  valores = [];
  valoresSinDuplicados = [];
  frecuencia = [];
  frecuenciaAcumulada = [];
  frecuenciaRelativa = [];
  frecuenciaRelativaAcumulada = [];
  sumatoria = 0;
  sumatoriadatos = 0;
  moda = [];
  media = 0;
  mediana = 0;
  medianados = 0;
  datomediana = 0;
  cont = 0;
  modamayor = 0;
  agregarValores(valor) {
    this.frecuencia = [];
    this.cont = 0;
    //Agregar Valores
    this.valoresSinOrden.push(parseFloat(valor.value));
    this.valores.push(parseFloat(valor.value));
    //Ordenar Valores
    if (valor) {
      valor.value = "";
    }
    this.valores.sort((a, b) => a - b);
    //Total de Frecuencia
    /*     this.sumatoria=0;
        this.valores.forEach(element => {
        this.sumatoria += element
        }); */

    //DatosSinRepetir
    const distinto = (valor, indice, self) => {
      return self.indexOf(valor) === indice;
    };
    this.valoresSinDuplicados = this.valores.filter(distinto);

    //Frecuencia

    for (let i = 0; i < this.valoresSinDuplicados.length; i++) {
      this.cont = 0;
      for (let j = 0; j < this.valoresSinOrden.length; j++) {
        if (this.valoresSinDuplicados[i] == this.valoresSinOrden[j]) {
          this.frecuencia[i] = this.cont += 1;
        }
      }
    }
    
    //suma de frecuencia
    this.sumatoria = 0;
    for (let i = 0; i < this.frecuencia.length; i++) {

      this.sumatoria += this.frecuencia[i];
    }
    //suma de datos
    this.sumatoriadatos = 0;
    for (let i = 0; i < this.valores.length; i++) {

      this.sumatoriadatos += this.valores[i];
    }
    //frecuencia acumulada
    this.frecuenciaAcumulada = [];
    this.frecuenciaAcumulada[0] = this.frecuencia[0];


    for (let i = 1; i < this.frecuencia.length; i++) {
      this.frecuenciaAcumulada[i] = this.frecuenciaAcumulada[i - 1] + this.frecuencia[i];
    }
    //Frecuencia Relativa

    for (let i = 0; i < this.valoresSinDuplicados.length; i++) {
      this.cont = 0;
      for (let j = 0; j < this.valoresSinOrden.length; j++) {
        if (this.valoresSinDuplicados[i] == this.valoresSinOrden[j]) {
          this.frecuenciaRelativa[i] = this.frecuencia[i] * 100 / this.sumatoria;
        }
      }
    }
    //Frecuencia Relativa Acumulada
    this.frecuenciaRelativaAcumulada = [];
    this.frecuenciaRelativaAcumulada[0] = this.frecuenciaRelativa[0];


    for (let i = 1; i < this.frecuenciaRelativa.length; i++) {
      this.frecuenciaRelativaAcumulada[i] = this.frecuenciaRelativaAcumulada[i - 1] + this.frecuenciaRelativa[i];
    }
    //moda

    //media
    this.media = this.sumatoriadatos / this.sumatoria;
    //mediana
    this.mediana = 0;
    this.datomediana = 0;

    if (this.valoresSinDuplicados.length % 2 == 0) {
      this.mediana = (this.valoresSinDuplicados.length) / 2;
      this.datomediana = (this.valoresSinDuplicados[this.mediana - 1] + this.valoresSinDuplicados[this.mediana]) / 2;


    } else {
      this.mediana = (this.valoresSinDuplicados.length + 1) / 2;
      this.datomediana = this.valoresSinDuplicados[this.mediana - 1];
    }

    this.moda = [];
    for (let m = 0; m < this.valoresSinOrden.length; m++) {
      for (let p = m + 1 ; p < this.valoresSinOrden.length; p++) {
        if (this.valoresSinOrden[m] === this.valoresSinOrden[p]) {
          this.moda.push(this.valoresSinOrden[p]);
          this.moda.sort((a, b) => a - b);
        }
      }
    }
  }


}







