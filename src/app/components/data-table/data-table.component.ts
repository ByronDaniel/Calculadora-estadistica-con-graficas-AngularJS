import { ExcelService } from './../../services/excel.service';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Label } from 'ng2-charts';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { empty } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  
  valoresSinOrden = [];
  frecuencia = [];
  cont = 0;
  valores = [];
  valoresSinDuplicados = [];
  sumatoria = 0;
  sumatoriadatos = 0;
  frecuenciaAcumulada = [];
  frecuenciaRelativa = [];
  frecuenciaRelativaAcumulada = [];
  media = 0;
  mediana = 0;
  datomediana = 0;
  moda = [];
  modaMayor = 0;
  diagramadepuntos = [];

  barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataSets[] = [
    { data: [], label: '' },
  ];
  // Pie
  pieChartOptions: ChartOptions = {
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

  pieChartLabels: Label[] = [];
  pieChartData: number[] = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [pluginDataLabels];
  pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,253,0,0.3)', 'rgba(0,0,251,0.3)', 'rgba(250,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)',],
    },
  ];

  rango = 0;
  clase = 0;
  clase2 = 0;
  amplitud = 0;
  intervaloInferior = [];
  intervaloSuperior = [];
  marcaDeClase = [];
  frecuenciaIntervalos = [];

  frecuenciaInterAcumulada = [];
  frecuenciarelativaMayor20 = [];
  frecuenciaporcentualMayor20 = [];

  constructor( private exportService: ExcelService ) { }

  ngOnInit(): void {
  }

  /*applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.valoresSinOrden.filter = filterValue.trim().toLowerCase();
  }*/

  exportAsXLSX() {
    //this.exportService.exportToExcel(this.valoresSinOrden.data, 'my_export');
    this.exportService.exportToExcel(this.valoresSinOrden, 'my_export');
  }

  /*exportAsXLSXField() {
    this.exportService.exportToExcel(this.valoresSinOrden.filteredData, 'my_export');
  }*/

  onFileChange(evt: any) {
    var fileName = evt.target.files[0].name;
      $('.custom-file-label').html(fileName);

    const target : DataTransfer =  <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      
      const bstr: string = e.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      wb.SheetNames.forEach(sheet => {
        let rowObject = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
        rowObject.forEach(element => {
          this.valoresSinOrden.push({
            No: this.valoresSinOrden.length+1,
            Dato : element['Dato']
          });
        }); 
        this.valoresSinOrden.forEach(element => {
          this.valores.push(element.Dato)
        });
      })

      this.valores.forEach(element => {
        this.calcularTabla(element.Dato)
      });
  
    };
    reader.readAsBinaryString(target.files[0]);
  }

  calcularTabla(value) {
    //Ordenar Valores
    this.valores.sort((a, b) => a - b);
      
    //DatosSinRepetir
    const distinto = (value, indice, self) => {
      return self.indexOf(value) === indice;
    };
    this.valoresSinDuplicados = this.valores.filter(distinto);

    //Frecuencia
    this.diagramadepuntos = [];
    for (let i = 0; i < this.valoresSinDuplicados.length; i++) {
      this.cont = 0;
      for (let j = 0; j < this.valoresSinOrden.length; j++) {
        if (this.valoresSinDuplicados[i] == this.valoresSinOrden[j].Dato) {
          this.frecuencia[i] = this.cont += 1;
          this.diagramadepuntos.push({ x: this.valoresSinDuplicados[i], y: this.cont },);
        }
      }
    }
    console.log(this.diagramadepuntos)

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
        if (this.valoresSinDuplicados[i] == this.valoresSinOrden[j].Dato) {
          this.frecuenciaRelativa[i] = (Number(this.frecuencia[i] / this.sumatoria));
        }
      }
    }

    //Frecuencia Relativa Acumulada
    this.frecuenciaRelativaAcumulada = [];
    this.frecuenciaRelativaAcumulada[0] = this.frecuenciaRelativa[0];

    for (let i = 0; i < this.valoresSinDuplicados.length; i++) {
      this.cont = 0;
      for (let j = 0; j < this.valoresSinOrden.length; j++) {
        if (this.valoresSinDuplicados[i] == this.valoresSinOrden[j].Dato) {

          this.frecuenciaRelativaAcumulada[i] = (Number((this.frecuencia[i] * 100)/ this.sumatoria));

        }
      }
    }

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

    //Moda
    this.moda = [];
      this.modaMayor = this.frecuencia[0];
      for (let m = 0; m < this.frecuencia.length; m++) {
        if (this.frecuencia[m] > this.modaMayor) {
          this.modaMayor = this.frecuencia[m];
        }
      }
      for (let i = 0; i < this.frecuencia.length; i++) {
        if (this.frecuencia[i] === this.modaMayor) {
          this.moda.push(this.valoresSinDuplicados[i]);
        }
      }

      this.barChartLabels = this.valoresSinDuplicados;
      this.frecuencia.push(0);
      this.barChartData = [
        { data: this.frecuencia , label: 'Frecuencias' },
      ];

      this.pieChartLabels = this.valoresSinDuplicados;
      this.pieChartData = this.frecuencia;

      this.rango = Math.max.apply(null, this.valoresSinDuplicados) - Math.min.apply(null, this.valoresSinDuplicados);
      this.clase = 1 + (3.322 * Math.log(this.sumatoria));
      this.amplitud = Math.round(this.rango / this.clase);

      this.intervaloInferior = [];
      this.intervaloSuperior = [];

      this.intervaloInferior.push(Math.min.apply(null, this.valoresSinDuplicados)); //- diferencia

      for (let i = 0; i < this.valoresSinDuplicados.length; i++) {
        this.intervaloInferior.push(this.valoresSinDuplicados[i] + this.amplitud);
      }
      for (let i = 1; i < this.intervaloInferior.length; i++) {
        this.intervaloSuperior.push(this.intervaloInferior[i]);
      }
      this.intervaloSuperior.push(this.intervaloInferior[this.intervaloInferior.length - 1] + this.amplitud);
      this.marcaDeClase = [];
      for (let i = 0; i < this.intervaloSuperior.length; i++) {
        this.marcaDeClase.push((this.intervaloInferior[i] + this.intervaloSuperior[i]) / 2);
      }
      this.frecuenciaIntervalos = [];
      //Frecuencia intervalos
      this.cont = 0;
      for (let i = 0; i < this.intervaloInferior.length; i++) {
        this.cont = 0;
        for (let j = 0; j < this.valoresSinOrden.length; j++) {
          if (this.valoresSinOrden[j].Dato >= this.intervaloInferior[i] && this.valoresSinOrden[j].Dato < this.intervaloSuperior[i]) {
            this.frecuenciaIntervalos[i] = this.cont += 1;
          } else if (this.frecuenciaIntervalos[i] === undefined) {
            this.frecuenciaIntervalos[i] = 0;
          }
        }
      }

      for (let i = 0; i < this.frecuenciaIntervalos.length; i++) {
        if (this.frecuenciaIntervalos[i] === empty) {
          this.frecuenciaIntervalos[i] = 0;
        }
      }
      //Frecuencia Relativa Mayor 20

      for (let i = 0; i < this.valoresSinDuplicados.length; i++) {
        this.cont = 0;
        for (let j = 0; j < this.valoresSinOrden.length; j++) {
          if (this.valoresSinDuplicados[i] == this.valoresSinOrden[j].Dato) {

            this.frecuenciarelativaMayor20[i] = (Number(this.frecuenciaIntervalos[i] / this.sumatoria));

          }
        }
    }

    //Frecuencia Porcentual > 20

    this.frecuenciaporcentualMayor20 = [];
    this.frecuenciaporcentualMayor20[0] = this.frecuenciarelativaMayor20[0];

      for (let i = 0; i < this.valoresSinDuplicados.length; i++) {
        this.cont = 0;
        for (let j = 0; j < this.valoresSinOrden.length; j++) {
          if (this.valoresSinDuplicados[i] == this.valoresSinOrden[j].Dato) {

            this.frecuenciaporcentualMayor20[i] = (Number((this.frecuenciaIntervalos[i] * 100)/ this.sumatoria));

          }
        }
      }

    //frecuencia Intervalo acumulada
    this.frecuenciaInterAcumulada = [];
    this.frecuenciaInterAcumulada[0] = this.frecuenciaIntervalos[0];


    for (let i = 1; i < this.frecuenciaIntervalos.length; i++) {
      this.frecuenciaInterAcumulada[i] = this.frecuenciaInterAcumulada[i - 1] + this.frecuenciaIntervalos[i];
    }

    this.scatterChartLabels = this.valoresSinDuplicados;
      this.scatterChartData = [
        { data: this.diagramadepuntos, label: 'frecuencia', pointRadius: 10},
        
      ];
  }

  agregarValores(valor?) {
    if (valor.value != "") {
      this.frecuencia = [];
      this.cont = 0;
      //Agregar Valores
      this.valoresSinOrden.push({ 
        No: this.valoresSinOrden.length+1,
        Dato : (parseFloat(valor.value))
      });
      this.valores.push(parseFloat(valor.value));
      
      if (valor) {
        valor.value = "";
      }
    }

    this.calcularTabla(this.valores);

  }

  randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

  public scatterChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {

          }
        }
      ],
      yAxes: [
        {
          ticks: {

            max: 15 ,
          }
        }
      ]
    }
  };
  public scatterChartLabels: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public scatterChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Frecuencias',
      pointRadius: 10,
    },
  ];
  
  public scatterChartType: ChartType = 'scatter';

}