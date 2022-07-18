export interface Roles{
    admin?:boolean;
    directivo?:boolean;
    presidente?:boolean;
    secretarioRector?:boolean;
}
export interface Usuarios {
    uid?:string;
    email:string;
    clave: string;
    cedula?: string;
    nomProvincia?:any;
    apellidos?: string;
    nombres?: string;
    emailVerified?: boolean;
    nomInstitucion?:string;
    idInstitucion?:any;
    /*roles:Roles;*/
    roles?: 'admin' | 'directivo' | 'presidente' | 'secretarioRector',
}

export interface DirectivoI{
    uid:string;
    email:string;
    clave: string;
    cedula?: string;
    provincia?:any;
    apellidos: string;
    nombres: string;
    emailVerified: boolean;    
    roles: 'directivo',
}
