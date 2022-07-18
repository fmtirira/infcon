import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogosService } from 'src/app/services/dialogos.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { RepresentantesService } from 'src/app/services/representantes.service';

@Component({
  selector: 'app-visualizar-representantes',
  templateUrl: './visualizar-representantes.component.html',
  styleUrls: ['./visualizar-representantes.component.css'],
  providers: [ProvinciaService]
})
export class VisualizarRepresentantesComponent implements OnInit {
  displayedColumns: string[] = ['numero', 'prefijo', 'nombres', 'apellidos', 'cargo', 'email', 'telefono', 'celular', 'nomInstitucion'];
  dataSource = new MatTableDataSource();
  representantes: any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private afs: AngularFirestore,
    public representanteService: RepresentantesService,
    public dialogoService: DialogosService,
  ) {

  }

  ngOnInit() {
    this.representanteService.GetAllRepresentantes()
      .subscribe(representante => this.dataSource.data = representante);
    this.dataSource.paginator = this.paginator;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getDoc<InstitucionesI>(path: string, id: any) {
    return this.afs.collection(path).doc<InstitucionesI>(id).valueChanges()
  }

}
