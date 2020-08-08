import { Component, OnInit, Input } from '@angular/core';
import { ExcelService } from './services/excel.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  @Input() fileExcel = [];

  constructor( private exportService: ExcelService ) {
  }

  ngOnInit() {
  }

  exportAsXLSX() {
    this.exportService.exportToExcel(this.fileExcel, 'Datos-Estadísticos');
  }
}










