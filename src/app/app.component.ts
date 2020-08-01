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
  frecuencia =[];
  frecuenciaAcumulada = [];
  frecuenciaRelativa = [];
  frecuenciaRelativaAcumulada = [];
  sumatoria= 0;
  cont=0;
  agregarValores(valor){
    this.frecuencia=[];
    this.cont=0;
    //Agregar Valores
    this.valoresSinOrden.push(parseFloat(valor.value));
    this.valores.push(parseFloat(valor.value));
    //Ordenar Valores
    if( valor ) {
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
  this.valoresSinDuplicados=this.valores.filter(distinto);
  
  //Frecuencia
    
      for(let i=0;i<this.valoresSinDuplicados.length;i++){
        this.cont=0;
        for (let j=0;j<this.valoresSinOrden.length;j++){
          if(this.valoresSinDuplicados[i]==this.valoresSinOrden[j]){
            this.frecuencia[i]=this.cont+=1;
          }
        }
      }
      //suma de frecuencia
       this.sumatoria=0;
        for(let i=0;i<this.frecuencia.length;i++){
          
          this.sumatoria+=this.frecuencia[i];
        }
        //frecuencia acumulada
      this.frecuenciaAcumulada=[];
      this.frecuenciaAcumulada[0]=this.frecuencia[0];


      for(let i =1;i<this.frecuencia.length;i++){
        this.frecuenciaAcumulada[i]=this.frecuenciaAcumulada[i-1]+this.frecuencia[i]; 
      }
      console.log(this.frecuenciaAcumulada)
        //Frecuencia Relativa
    
        for(let i=0;i<this.valoresSinDuplicados.length;i++){
          this.cont=0;
          for (let j=0;j<this.valoresSinOrden.length;j++){
            if(this.valoresSinDuplicados[i]==this.valoresSinOrden[j]){
              this.frecuenciaRelativa[i]=this.frecuencia[i]*100/this.sumatoria;
            }
          }
        }
//Frecuencia Relativa Acumulada
this.frecuenciaRelativaAcumulada=[];
      this.frecuenciaRelativaAcumulada[0]=this.frecuenciaRelativa[0];


      for(let i =1;i<this.frecuenciaRelativa.length;i++){
        this.frecuenciaRelativaAcumulada[i]=this.frecuenciaRelativaAcumulada[i-1]+this.frecuenciaRelativa[i]; 
      }
      console.log(this.frecuenciaRelativaAcumulada)
   
  }
    
    

  


}
