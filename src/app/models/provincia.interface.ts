export interface Provincias {
    id:number;
    nomProvincia:string;
}

export interface Cantones{
    id: number;
    provinciaId: number;
    nomCanton: string;
}