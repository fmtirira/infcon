export interface NivelGroupI {
    nombre?: any;
    nivel: Nivel[];
    disabled?: boolean;
    
}
export interface Nivel {
    id: any;
    nomNivelEducacion: any;
    hombres?: any;
    mujeres?: any;
    total?: any;    
}

export interface NivelDocentes {
    idNivel: any,
    nomNivelEducacion: any,
    docenHombres?: any,
    docenMujeres?: any,
    docenTotal?: any,  
}
export interface TipoEducacionI {
    id: number;
    nomTipoEducacion: any;
}

export interface SostenimientoI {
    id: number;
    nomSostenimeinto: any;
}

export interface ZonaInecI {
    id: number;
    nomZonaInec: any;
}
export interface JurisdiccionI {
    id: number;
    nomJurisdiccion: any;
}
export interface InmuebleEdificioI {
    id: number;
    nomInmueble: any;
}
export interface ModalidadI {
    id: number;
    nomModalidad: any;
}

export interface JornadaI {
    id: number;
    nomJornada: any;
}