import { Injectable } from '@angular/core';
import {
  NivelGroupI, TipoEducacionI,
  SostenimientoI, ZonaInecI, JurisdiccionI,
  InmuebleEdificioI,
  ModalidadI,
  JornadaI
} from '../models/nivelEducacion.interface';

@Injectable({
  providedIn: 'root'
})
export class NivelesService {

  nivelesEducacion: NivelGroupI[] = [
    {
      nombre: 'Inicial',
      nivel: [
        { id: 'anios3', nomNivelEducacion: '3 Años' },
        { id: 'anios4', nomNivelEducacion: '4 Años' },
        { id: 'basica1', nomNivelEducacion: '1 Básica' },
      ],
    },
    {
      nombre: 'Preparatoria',
      nivel: [
        { id: 'basica2', nomNivelEducacion: '2 Básica' },
        { id: 'basica3', nomNivelEducacion: '3 Básica' },
        { id: 'basica4', nomNivelEducacion: '4 Básica' },
      ],
    },
    {
      nombre: 'Media',
      nivel: [
        { id: 'basica5', nomNivelEducacion: '5 Básica' },
        { id: 'basica6', nomNivelEducacion: '6 Básica' },
        { id: 'basica7', nomNivelEducacion: '7 Básica' },
      ],
    },
    {
      nombre: 'Básica Superior',
      nivel: [
        { id: 'basica8', nomNivelEducacion: '8 Básica' },
        { id: 'basica9', nomNivelEducacion: '9 Básica' },
        { id: 'basica10', nomNivelEducacion: '10 Básica' },
      ],
    },
    {
      nombre: 'Bachillerato',
      nivel: [
        { id: 'bachi1', nomNivelEducacion: '1 Bachillerato' },
        { id: 'bachi2', nomNivelEducacion: '2 Bachillerato' },
        { id: 'bachi3', nomNivelEducacion: '3 Bachillerato' },
      ],
    }
  ];

  private tipoEducacion: TipoEducacionI[] = [
    {
      id: 1,
      nomTipoEducacion: 'Educacion Regular'
    },
    {
      id: 2,
      nomTipoEducacion: 'Popular Permanente'
    },
    {
      id: 3,
      nomTipoEducacion: 'Formación Artística'
    },
    {
      id: 4,
      nomTipoEducacion: 'Educación Especial'
    }
  ];

  private sostenimiento: SostenimientoI[] = [
    {
      id: 1,
      nomSostenimeinto: 'Fiscomisional'
    },
    {
      id: 2,
      nomSostenimeinto: 'Particular Laico'
    },
    {
      id: 3,
      nomSostenimeinto: 'Particular Religioso'
    }
  ];

  private zonaInec: ZonaInecI[] = [
    {
      id: 1,
      nomZonaInec: 'RuralINEC'
    },
    {
      id: 2,
      nomZonaInec: 'UrbanaINEC'
    },
  ];

  private jurisdiccion: JurisdiccionI[] = [
    {
      id: 1,
      nomJurisdiccion: 'Bilingüe'
    },
    {
      id: 2,
      nomJurisdiccion: 'Hispana'
    },
  ];

  private inmuebleEdi: InmuebleEdificioI[] = [
    {
      id: 1,
      nomInmueble: 'Arriendo'
    },
    {
      id: 2,
      nomInmueble: 'Cesión de Derechos'
    },
    {
      id: 3,
      nomInmueble: 'Comodato'
    },
    {
      id: 4,
      nomInmueble: 'No conoce'
    },
    {
      id: 5,
      nomInmueble: 'Prestado'
    },
    {
      id: 6,
      nomInmueble: 'Propio'
    },
  ];

  private modalidadInsti: ModalidadI[] = [
    {
      id: 1,
      nomModalidad: 'Presencial'
    },
    {
      id: 2,
      nomModalidad: 'Semipresencial'
    },
    {
      id: 3,
      nomModalidad: 'Radiofónica'
    },
    {
      id: 4,
      nomModalidad: 'A Distancia'
    }
  ];

  private jornada: JornadaI[] = [
    {
      id: 1,
      nomJornada: 'Matutina'
    },
    {
      id: 2,
      nomJornada: 'Vespertina'
    },
    {
      id: 3,
      nomJornada: 'Nocturna'
    },
  ]
  GetNiveles(): NivelGroupI[] {
    return this.nivelesEducacion;
  }

  GetTiposEducacion(): TipoEducacionI[] {
    return this.tipoEducacion;
  }

  GetSostenimiento(): SostenimientoI[] {
    return this.sostenimiento;
  }
  GetZonaInec(): ZonaInecI[] {
    return this.zonaInec;
  }
  GetJurisdiccion(): JurisdiccionI[] {
    return this.jurisdiccion;
  }
  GetInmuebleEdi(): InmuebleEdificioI[] {
    return this.inmuebleEdi;
  }

  GetModalidad(): ModalidadI[] {
    return this.modalidadInsti;
  }

  GetJornada(): JornadaI[] {
    return this.jornada;
  }
  constructor() { }
}
