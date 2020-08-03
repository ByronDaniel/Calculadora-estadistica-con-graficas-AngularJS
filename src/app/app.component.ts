import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { empty } from 'rxjs';
import { isEmptyExpression } from '@angular/compiler';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  //grafico


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
  datomediana = 0;
  cont = 0;
  modamayor = 0;
  intervaloDeClase = 0;
  marcaDeClase = [];
  frecuenciaIntervalos = [];

  intervaloInferior = [];
  intervaloSuperior = [];
  intervaloimpar = [];
  intervalopar = [];
  rango = 0;
  clase = 0;
  clase2 = 0;
  frecuenciaInterAcumulada = [];
  agregarValores(valor) {
    if (valor.value != "") {
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

            this.frecuenciaRelativa[i] = (Number(this.frecuencia[i] * 100 / this.sumatoria));

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
      //moda-marlon
      /*     this.moda = [];
          for (let m = 0; m < this.valoresSinOrden.length; m++) {
            for (let p = m + 1 ; p < this.valoresSinOrden.length; p++) {
              if (this.valoresSinOrden[m] === this.valoresSinOrden[p]) {
                this.moda.push(this.valoresSinOrden[p]);
                this.moda.sort((a, b) => a - b);
              }
            }
          } */
      this.moda = [];
      this.modamayor = this.frecuencia[0];
      for (let m = 0; m < this.frecuencia.length; m++) {
        if (this.frecuencia[m] > this.modamayor) {
          this.modamayor = this.frecuencia[m];
        }
      }
      for (let i = 0; i < this.frecuencia.length; i++) {
        if (this.frecuencia[i] === this.modamayor) {
          this.moda.push(this.valoresSinDuplicados[i]);
        }
      }



      this.barChartLabels = this.valoresSinDuplicados;
      this.barChartData = [
        { data: this.frecuencia, label: 'frecuencia' },
      ];

      this.pieChartLabels = this.valoresSinDuplicados;
      this.pieChartData = this.frecuencia;
    }

    this.rango = Math.max.apply(null, this.valoresSinDuplicados) - Math.min.apply(null, this.valoresSinDuplicados);

    this.clase =1 + (3.322 * Math.log(this.sumatoria)) ;

    this.intervaloDeClase = Math.round(this.rango / this.clase);

    this.intervaloInferior = [];
    this.intervaloSuperior = [];

    this.intervaloInferior.push(Math.min.apply(null, this.valoresSinDuplicados));
    for (let i = 0; i < this.valoresSinDuplicados.length; i++) {
      this.intervaloInferior.push(this.valoresSinDuplicados[i] + this.intervaloDeClase);
    }
    for (let i = 1; i < this.intervaloInferior.length; i++) {
      this.intervaloSuperior.push(this.intervaloInferior[i]);
    }
    this.intervaloSuperior.push(this.intervaloInferior[this.intervaloInferior.length - 1] + this.intervaloDeClase);
    this.marcaDeClase = [];
    for (let i = 0; i < this.intervaloSuperior.length; i++) {
      this.marcaDeClase.push((this.intervaloInferior[i] + this.intervaloSuperior[i]) / 2);
    }
    this.frecuenciaIntervalos=[];
     //Frecuencia intervalos
     this.cont = 0;
     for (let i = 0; i < this.intervaloInferior.length; i++) {
      this.cont = 0;
      for (let j = 0; j < this.valoresSinOrden.length; j++) {
        if (this.valoresSinOrden[j] >= this.intervaloInferior[i]&&this.valoresSinOrden[j] < this.intervaloSuperior[i]) {
          this.frecuenciaIntervalos[i] = this.cont += 1;
        }else if(this.frecuenciaIntervalos[i]===undefined){
        this.frecuenciaIntervalos[i] = 0;
      }
    }}
    
    for(let i = 0; i < this.frecuenciaIntervalos.length; i++){
      if(this.frecuenciaIntervalos[i]===empty){
        this.frecuenciaIntervalos[i]=0;
      }
    }
    console.log(this.frecuenciaIntervalos);

    //frecuencia Intervalo acumulada
this.frecuenciaInterAcumulada = [];
this.frecuenciaInterAcumulada[0] = this.frecuenciaIntervalos[0];


for (let i = 1; i < this.frecuenciaIntervalos.length; i++) {
  this.frecuenciaInterAcumulada[i] = this.frecuenciaInterAcumulada[i - 1] + this.frecuenciaIntervalos[i];
}
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [], label: '' },
    /* { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' } */
  ];

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }


  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,253,0,0.3)', 'rgba(0,0,251,0.3)', 'rgba(250,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)',],
    },
  ];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }







  constructor() {


  }

  ngOnInit() {
  }



}










