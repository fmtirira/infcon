export interface InstitucionesI {
    //para poder usar en firestore
    idInstitucion?:any,
    //sale en el crud
    codigoAMIE?: string,
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
    cifrasDocentes?:NivelDocentes[],
    cifrasAdministrativos?:[{
        idAdmin:'cifraAdmin',
        adminHombres:any,
        adminMujeres:any,
    }],
    niveles?:Nivel[],   
}

export interface NivelGroupI {
    nombre?: any;
    nivel?: Nivel[];
    disabled?: boolean;
    
}
export interface Nivel {
    id?: any;
    nomNivelEducacion?: any;
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
export interface CifrasAdministrativoI{
    idAdmin: any;
    adminTotal?: any;
    adminMujeres?: any;
    adminHombres?: any;
}