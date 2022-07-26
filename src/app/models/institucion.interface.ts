export interface InstitucionesI {
    //para poder usar en firestore
    idInstitucion?:any,
    //sale en el crud
    codigoAMIE?: string,
    logo?: any,
    nomInstitucion?: string,    
    direccionInstitucion?:string,
    //matutina y vespertina
    jornada?:any,
    jurisdiccion?:any,
    modalidad?:any,
    tipoEducacio?:any,
    sostenimiento?:any,
    tenenciaEdificio?:any,
    zonaInec?:any,
    nomProvincia?:string,
    //se puede elegir varias opciones basica bahillerato etc
    nivelEducacion?:any,
    cifrasAdministrativos?:any,
    niveles?:any,   
}

export interface NivelGroupI {
    nombre?: any;
    nivel?: Nivel[];
    disabled?: boolean;
    
}
export interface Nivel {
    id?: any;
    nomNivelEducacion?: any;
    nomInstitucion?: any;
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
