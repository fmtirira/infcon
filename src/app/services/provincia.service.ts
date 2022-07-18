import { Injectable } from '@angular/core';
import { Provincias, Cantones } from '../models/provincia.interface';

@Injectable(
  /*{
  //si no quiero usar para toda la app puedo borrar esta opcion
  providedIn: 'root'
}*/)
export class ProvinciaService {

  private provincias:Provincias[] =[
    {
      id:1,
      nomProvincia: 'AZUAY'
    },
    {
      id:2,
      nomProvincia: 'BOLÍVAR'
    },
    {
      id:3,
      nomProvincia: 'CAÑAR'
    },
    {
      id:4,
      nomProvincia: 'CARCHI'
    },
    {
      id:5,
      nomProvincia: 'COTOPAXI'
    },
    {
      id:6,
      nomProvincia: 'CHIMBORAZO'
    },
    {
      id:7,
      nomProvincia: 'EL ORO'
    },
    {
      id:8,
      nomProvincia: 'ESMERALDAS'
    },
    {
      id:9,
      nomProvincia: 'GUAYAS'
    },
    {
      id:10,
      nomProvincia: 'IMBABURA'
    },
    {
      id:11,
      nomProvincia: 'LOJA'
    },
    {
      id:12,
      nomProvincia: 'LOS RÍOS'
    },
    {
      id:13,
      nomProvincia: 'MANABÍ'
    },
    {
      id:14,
      nomProvincia: 'MORONA SANTIAGO'
    },
    {
      id:15,
      nomProvincia: 'NAPO'
    },
    {
      id:16,
      nomProvincia: 'PASTAZA'
    },
    {
      id:17,
      nomProvincia: 'PICHINCHA'
    },
    {
      id:18,
      nomProvincia: 'TUNGURAHUA'
    },
    {
      id:19,
      nomProvincia: 'ZAMORA CHINCHIPE'
    },
    {
      id:20,
      nomProvincia: 'GALÁPAGOS'
    },
    {
      id:21,
      nomProvincia: 'SUCUMBÍOS'
    },
    {
      id:22,
      nomProvincia: 'ORELLANA'
    },
    {
      id:23,
      nomProvincia: 'SANTO DOMINGO DE LOS TSÁCHILAS'
    },
    {
      id:24,
      nomProvincia: 'SANTA ELENA'
    }
  ];
  private cantones: Cantones[]=[
    {
      id:101,
      provinciaId:1,
      nomCanton: 'CUENCA'
    },
    {
      id:102,
      provinciaId:1,
      nomCanton: 'GIRÓN'
    },
    {
      id:103,
      provinciaId:1,
      nomCanton: 'GUALACEO'
    },
    {
      id:104,
      provinciaId:1,
      nomCanton: 'NABÓN'
    },
    {
      id:105,
      provinciaId:1,
      nomCanton: 'PAUTE'
    },
    {
      id:106,
      provinciaId:1,
      nomCanton: 'PUCARÁ'
    },
    {
      id:107,
      provinciaId:1,
      nomCanton: 'SAN FERNANDO'
    },
    {
      id:108,
      provinciaId:1,
      nomCanton: 'SANTA ISABEL'
    },
    {
      id:109,
      provinciaId:1,
      nomCanton: 'SIGSIG'
    },
    {
      id:110,
      provinciaId:1,
      nomCanton: 'OÑA'
    },
    {
      id:111,
      provinciaId:1,
      nomCanton: 'CHORDELEG'
    },
    {
      id:112,
      provinciaId:1,
      nomCanton: 'EL PAN'
    },
    {
      id:113,
      provinciaId:1,
      nomCanton: 'SEVILLA DE ORO'
    },
    {
      id:114,
      provinciaId:1,
      nomCanton: 'GUACHAPALA'
    },
    {
      id:115,
      provinciaId:1,
      nomCanton: 'CAMILO PONCE ENRÍQUEZ'
    },
    {
      id:201,
      provinciaId:2,
      nomCanton: 'GUARANDA'
    },
    {
      id:202,
      provinciaId:2,
      nomCanton: 'CHILLANES'
    },
    {
      id:203,
      provinciaId:2,
      nomCanton: 'CHIMBO'
    },
    {
      id:204,
      provinciaId:2,
      nomCanton: 'ECHEANDÍA'
    },
    {
      id:205,
      provinciaId:2,
      nomCanton: 'SAN MIGUEL'
    },
    {
      id:206,
      provinciaId:2,
      nomCanton: 'CALUMA'
    },
    {
      id:207,
      provinciaId:2,
      nomCanton: 'LAS NAVES'
    },
    {
      id:301,
      provinciaId:3,
      nomCanton: 'AZOGUES'
    },
    {
      id:302,
      provinciaId:3,
      nomCanton: 'BIBLIÁN'
    },
    {
      id:303,
      provinciaId:3,
      nomCanton: 'CAÑAR'
    },
    {
      id:304,
      provinciaId:3,
      nomCanton: 'LA TRONCAL'
    },
    {
      id:305,
      provinciaId:3,
      nomCanton: 'EL TAMBO'
    },
    {
      id:306,
      provinciaId:3,
      nomCanton: 'DÉLEG'
    },
    {
      id:307,
      provinciaId:3,
      nomCanton: 'SUSCAL'
    },
    {
      id:401,
      provinciaId:4,
      nomCanton: 'TULCÁN'
    },
    {
      id:402,
      provinciaId:4,
      nomCanton: 'BOLÍVAR'
    },
    {
      id:403,
      provinciaId:4,
      nomCanton: 'ESPEJO'
    },
    {
      id:404,
      provinciaId:4,
      nomCanton: 'MIRA'
    },
    {
      id:405,
      provinciaId:4,
      nomCanton: 'MONTÚFAR'
    },
    {
      id:406,
      provinciaId:4,
      nomCanton: 'SAN PEDRO DE HUACA'
    },
    {
      id:501,
      provinciaId:5,
      nomCanton: 'LATACUNGA'
    },
    {
      id:502,
      provinciaId:5,
      nomCanton: 'LA MANÁ'
    },
    {
      id:503,
      provinciaId:5,
      nomCanton: 'PANGUA'
    },
    {
      id:504,
      provinciaId:5,
      nomCanton: 'PUJILÍ'
    },
    {
      id:505,
      provinciaId:5,
      nomCanton: 'SALCEDO'
    },
    {
      id:506,
      provinciaId:5,
      nomCanton: 'SAQUISILÍ'
    },
    {
      id:507,
      provinciaId:5,
      nomCanton: 'SIGCHOS'
    },
    {
      id:601,
      provinciaId:6,
      nomCanton: 'RIOBAMBA'
    },
    {
      id:602,
      provinciaId:6,
      nomCanton: 'ALAUSÍ'
    },
    {
      id:603,
      provinciaId:6,
      nomCanton: 'COLTA'
    },
    {
      id:604,
      provinciaId:6,
      nomCanton: 'CHAMBO'
    },
    {
      id:605,
      provinciaId:6,
      nomCanton: 'CHUNCHI'
    },
    {
      id:606,
      provinciaId:6,
      nomCanton: 'GUAMOTE'
    },
    {
      id:607,
      provinciaId:6,
      nomCanton: 'GUANO'
    },
    {
      id:608,
      provinciaId:6,
      nomCanton: 'PALLATANGA'
    },
    {
      id:609,
      provinciaId:6,
      nomCanton: 'PENIPE'
    },
    {
      id:610,
      provinciaId:6,
      nomCanton: 'CUMANDÁ'
    },
    {
      id:701,
      provinciaId:7,
      nomCanton: 'MACHALA'
    },
    {
      id:702,
      provinciaId:7,
      nomCanton: 'ARENILLAS'
    },
    {
      id:703,
      provinciaId:7,
      nomCanton: 'ATAHUALPA'
    },
    {
      id:704,
      provinciaId:7,
      nomCanton: 'BALSAS'
    },
    {
      id:705,
      provinciaId:7,
      nomCanton: 'CHILLA'
    },
    {
      id:706,
      provinciaId:7,
      nomCanton: 'EL GUABO'
    },
    {
      id:707,
      provinciaId:7,
      nomCanton: 'HUAQUILLAS'
    },
    {
      id:708,
      provinciaId:7,
      nomCanton: 'MARCABELÍ'
    },
    {
      id:709,
      provinciaId:7,
      nomCanton: 'PASAJE'
    },
    {
      id:710,
      provinciaId:7,
      nomCanton: 'PIÑAS'
    },
    {
      id:711,
      provinciaId:7,
      nomCanton: 'PORTOVELO'
    },
    {
      id:712,
      provinciaId:7,
      nomCanton: 'SANTA ROSA'
    },
    {
      id:713,
      provinciaId:7,
      nomCanton: 'ZARUMA'
    },
    {
      id:714,
      provinciaId:7,
      nomCanton: 'LAS LAJAS'
    },
    {
      id:801,
      provinciaId:8,
      nomCanton: 'ESMERALDAS'
    },
    {
      id:802,
      provinciaId:8,
      nomCanton: 'ELOY ALFARO'
    },
    {
      id:803,
      provinciaId:8,
      nomCanton: 'MUISNE'
    },
    {
      id:804,
      provinciaId:8,
      nomCanton: 'QUININDÉ'
    },
    {
      id:805,
      provinciaId:8,
      nomCanton: 'SAN LORENZO'
    },
    {
      id:806,
      provinciaId:8,
      nomCanton: 'ATACAMES'
    },
    {
      id:807,
      provinciaId:8,
      nomCanton: 'RIOVERDE'
    },
    {
      id:808,
      provinciaId:8,
      nomCanton: 'LA CONCORDIA'
    },
    {
      id:901,
      provinciaId:9,
      nomCanton: 'GUAYAQUIL'
    },
    {
      id:902,
      provinciaId:9,
      nomCanton: 'ALFREDO BAQUERIZO MORENO (JUJÁN)'
    },
    {
      id:903,
      provinciaId:9,
      nomCanton: 'BALAO'
    },
    {
      id:904,
      provinciaId:9,
      nomCanton: 'BALZAR'
    },
    {
      id:905,
      provinciaId:9,
      nomCanton: 'COLIMES'
    },
    {
      id:906,
      provinciaId:9,
      nomCanton: 'DAULE'
    },
    {
      id:907,
      provinciaId:9,
      nomCanton: 'DURÁN'
    },
    {
      id:908,
      provinciaId:9,
      nomCanton: 'EL EMPALME'
    },
    {
      id:909,
      provinciaId:9,
      nomCanton: 'EL TRIUNFO'
    },
    {
      id:910,
      provinciaId:9,
      nomCanton: 'MILAGRO'
    },
    {
      id:911,
      provinciaId:9,
      nomCanton: 'NARANJAL'
    },
    {
      id:912,
      provinciaId:9,
      nomCanton: 'NARANJITO'
    },
    {
      id:913,
      provinciaId:9,
      nomCanton: 'PALESTINA'
    },
    {
      id:914,
      provinciaId:9,
      nomCanton: 'PEDRO CARBO'
    },
    {
      id:915,
      provinciaId:9,
      nomCanton: 'SAMBORONDÓN'
    },
    {
      id:916,
      provinciaId:9,
      nomCanton: 'SANTA LUCÍA'
    },
    {
      id:917,
      provinciaId:9,
      nomCanton: 'SALITRE (URBINA JADO)'
    },
    {
      id:918,
      provinciaId:9,
      nomCanton: 'SAN JACINTO DE YAGUACHI'
    },
    {
      id:919,
      provinciaId:9,
      nomCanton: 'PLAYAS'
    },
    {
      id:920,
      provinciaId:9,
      nomCanton: 'SIMÓN BOLÍVAR'
    },
    {
      id:921,
      provinciaId:9,
      nomCanton: 'CORONEL MARCELINO MARIDUEÑA'
    },
    {
      id:922,
      provinciaId:9,
      nomCanton: 'LOMAS DE SARGENTILLO'
    },
    {
      id:923,
      provinciaId:9,
      nomCanton: 'NOBOL'
    },
    {
      id:924,
      provinciaId:9,
      nomCanton: 'GENERAL ANTONIO ELIZALDE'
    },
    {
      id:925,
      provinciaId:9,
      nomCanton: 'ISIDRO AYORA'
    },
    {
      id:1001,
      provinciaId:10,
      nomCanton: 'IBARRA'
    },
    {
      id:1002,
      provinciaId:10,
      nomCanton: 'ANTONIO ANTE'
    },
    {
      id:1003,
      provinciaId:10,
      nomCanton: 'COTACACHI'
    },
    {
      id:1004,
      provinciaId:10,
      nomCanton: 'OTAVALO'
    },
    {
      id:1005,
      provinciaId:10,
      nomCanton: 'PIMAMPIRO'
    },
    {
      id:1006,
      provinciaId:10,
      nomCanton: 'SAN MIGUEL DE URCUQUÍ'
    },
    {
      id:1101,
      provinciaId:11,
      nomCanton: 'LOJA'
    },
    {
      id:1102,
      provinciaId:11,
      nomCanton: 'CALVAS'
    },
    {
      id:1103,
      provinciaId:11,
      nomCanton: 'CATAMAYO'
    },
    {
      id:1104,
      provinciaId:11,
      nomCanton: 'CELICA'
    },
    {
      id:1105,
      provinciaId:11,
      nomCanton: 'CHAGUARPAMBA'
    },

    {
      id:1106,
      provinciaId:10,
      nomCanton: 'ESPÍNDOLA'
    },
    {
      id:1107,
      provinciaId:11,
      nomCanton: 'GONZANAMÁ'
    },
    {
      id:1108,
      provinciaId:11,
      nomCanton: 'MACARÁ'
    },
    {
      id:1109,
      provinciaId:11,
      nomCanton: 'PALTAS'
    },

    {
      id:1110,
      provinciaId:11,
      nomCanton: 'PUYANGO'
    },
    {
      id:1111,
      provinciaId:11,
      nomCanton: 'SARAGURO'
    },
    {
      id:1112,
      provinciaId:11,
      nomCanton: 'SOZORANGA'
    },
    {
      id:1113,
      provinciaId:11,
      nomCanton: 'ZAPOTILLO'
    },
    {
      id:1114,
      provinciaId:11,
      nomCanton: 'PINDAL'
    },
    {
      id:1115,
      provinciaId:11,
      nomCanton: 'QUILANGA'
    },
    {
      id:1116,
      provinciaId:11,
      nomCanton: 'OLMEDO'
    },
    {
      id:1201,
      provinciaId:12,
      nomCanton: 'BABAHOYO'
    },
    {
      id:1202,
      provinciaId:12,
      nomCanton: 'BABA'
    },
    {
      id:1203,
      provinciaId:12,
      nomCanton: 'MONTALVO'
    },
    {
      id:1204,
      provinciaId:12,
      nomCanton: 'PUEBLOVIEJO'
    },
    {
      id:1205,
      provinciaId:12,
      nomCanton: 'QUEVEDO'
    },
    {
      id:1206,
      provinciaId:12,
      nomCanton: 'URDANETA'
    },
    {
      id:1207,
      provinciaId:12,
      nomCanton: 'VENTANAS'
    },
    {
      id:1208,
      provinciaId:12,
      nomCanton: 'VINCES'
    },
    {
      id:1209,
      provinciaId:12,
      nomCanton: 'PALENQUE'
    },
    {
      id:1210,
      provinciaId:12,
      nomCanton: 'BUENA FÉ'
    },
    {
      id:1211,
      provinciaId:12,
      nomCanton: 'VALENCIA'
    },
    {
      id:1212,
      provinciaId:12,
      nomCanton: 'MOCACHE'
    },
    {
      id:1213,
      provinciaId:12,
      nomCanton: 'QUINSALOMA'
    },
    {
      id:1301,
      provinciaId:13,
      nomCanton: 'PORTOVIEJO'
    },
    {
      id:1302,
      provinciaId:13,
      nomCanton: 'BOLÍVAR'
    },
    {
      id:1303,
      provinciaId:13,
      nomCanton: 'CHONE'
    },
    {
      id:1304,
      provinciaId:13,
      nomCanton: 'EL CARMEN'
    },
    {
      id:1305,
      provinciaId:13,
      nomCanton: 'FLAVIO ALFARO'
    },
    {
      id:1306,
      provinciaId:13,
      nomCanton: 'JIPIJAPA'
    },
    {
      id:1307,
      provinciaId:13,
      nomCanton: 'JUNÍN'
    },
    {
      id:1308,
      provinciaId:13,
      nomCanton: 'MANTA'
    },
    {
      id:1309,
      provinciaId:13,
      nomCanton: 'MONTECRISTI'
    },
    {
      id:1310,
      provinciaId:13,
      nomCanton: 'PAJÁN'
    },
    {
      id:1311,
      provinciaId:13,
      nomCanton: 'PICHINCHA'
    },
    {
      id:1312,
      provinciaId:13,
      nomCanton: 'ROCAFUERTE'
    },
    {
      id:1313,
      provinciaId:13,
      nomCanton: 'SANTA ANA'
    },
    {
      id:1314,
      provinciaId:13,
      nomCanton: 'SUCRE'
    },
    {
      id:1315,
      provinciaId:13,
      nomCanton: 'TOSAGUA'
    },
    {
      id:1316,
      provinciaId:13,
      nomCanton: '24 DE MAYO'
    },
    {
      id:1317,
      provinciaId:13,
      nomCanton: 'PEDERNALES'
    },
    {
      id:1318,
      provinciaId:13,
      nomCanton: 'OLMEDO'
    },
    {
      id:1319,
      provinciaId:13,
      nomCanton: 'PUERTO LÓPEZ'
    },
    {
      id:1320,
      provinciaId:13,
      nomCanton: 'JAMA'
    },
    {
      id:1321,
      provinciaId:13,
      nomCanton: 'JARAMIJÓ'
    },
    {
      id:1322,
      provinciaId:13,
      nomCanton: 'SAN VICENTE'
    },
    {
      id:1401,
      provinciaId:14,
      nomCanton: 'MORONA'
    },
    {
      id:1402,
      provinciaId:14,
      nomCanton: 'GUALAQUIZA'
    },
    {
      id:1403,
      provinciaId:14,
      nomCanton: 'LIMÓN INDANZA'
    },
    {
      id:1404,
      provinciaId:14,
      nomCanton: 'PALORA'
    },
    {
      id:1405,
      provinciaId:14,
      nomCanton: 'SANTIAGO'
    },
    {
      id:1406,
      provinciaId:14,
      nomCanton: 'SUCÚA'
    },
    {
      id:1407,
      provinciaId:14,
      nomCanton: 'HUAMBOYA'
    },
    {
      id:1408,
      provinciaId:14,
      nomCanton: 'SAN JUAN BOSCO'
    },
    {
      id:1409,
      provinciaId:14,
      nomCanton: 'TAISHA'
    },
    {
      id:1410,
      provinciaId:14,
      nomCanton: 'LOGROÑO'
    },
    {
      id:1411,
      provinciaId:14,
      nomCanton: 'PABLO SEXTO'
    },
    {
      id:1412,
      provinciaId:14,
      nomCanton: 'TIWINTZA'
    },
    {
      id:1501,
      provinciaId:15,
      nomCanton: 'TENA'
    },
    {
      id:1502,
      provinciaId:15,
      nomCanton: 'ARCHIDONA'
    },
    {
      id:1503,
      provinciaId:15,
      nomCanton: 'EL CHACO'
    },
    {
      id:1504,
      provinciaId:15,
      nomCanton: 'QUIJOS'
    },
    {
      id:1505,
      provinciaId:15,
      nomCanton: 'CARLOS JULIO AROSEMENA TOLA'
    },
    {
      id:1601,
      provinciaId:16,
      nomCanton: 'PASTAZA'
    },
    {
      id:1602,
      provinciaId:16,
      nomCanton: 'MERA'
    },
    {
      id:1603,
      provinciaId:16,
      nomCanton: 'SANTA CLARA'
    },
    {
      id:1604,
      provinciaId:16,
      nomCanton: 'ARAJUNO'
    },
    {
      id:1701,
      provinciaId:17,
      nomCanton: 'QUITO'
    },
    {
      id:1702,
      provinciaId:17,
      nomCanton: 'CAYAMBE'
    },
    {
      id:1703,
      provinciaId:17,
      nomCanton: 'MEJÍA'
    },
    {
      id:1704,
      provinciaId:17,
      nomCanton: 'PEDRO MONCAYO'
    },
    {
      id:1705,
      provinciaId:17,
      nomCanton: 'RUMIÑAHUI'
    },
    {
      id:1706,
      provinciaId:17,
      nomCanton: 'SAN MIGUEL DE LOS BANCOS'
    },
    {
      id:1707,
      provinciaId:17,
      nomCanton: 'PEDRO VICENTE MALDONADO'
    },
    {
      id:1708,
      provinciaId:17,
      nomCanton: 'PUERTO QUITO'
    },
    {
      id:1801,
      provinciaId:18,
      nomCanton: 'AMBATO'
    },
    {
      id:1802,
      provinciaId:18,
      nomCanton: 'BAÑOS DE AGUA SANTA'
    },
    {
      id:1803,
      provinciaId:18,
      nomCanton: 'CEVALLOS'
    },
    {
      id:1804,
      provinciaId:18,
      nomCanton: 'MOCHA'
    },
    {
      id:1805,
      provinciaId:18,
      nomCanton: 'PATATE'
    },
    {
      id:1806,
      provinciaId:18,
      nomCanton: 'QUERO'
    },
    {
      id:1807,
      provinciaId:18,
      nomCanton: 'SAN PEDRO DE PELILEO'
    },
    {
      id:1808,
      provinciaId:18,
      nomCanton: 'SANTIAGO DE PÍLLARO'
    },
    {
      id:1809,
      provinciaId:18,
      nomCanton: 'TISALEO'
    },
    {
      id:1901,
      provinciaId:19,
      nomCanton: 'ZAMORA'
    },
    {
      id:1902,
      provinciaId:19,
      nomCanton: 'CHINCHIPE'
    },
    {
      id:1903,
      provinciaId:19,
      nomCanton: 'NANGARITZA'
    },
    {
      id:1904,
      provinciaId:19,
      nomCanton: 'YACUAMBI'
    },
    {
      id:1905,
      provinciaId:19,
      nomCanton: 'YANTZAZA'
    },
    {
      id:1906,
      provinciaId:19,
      nomCanton: 'EL PANGUI'
    },
    {
      id:1907,
      provinciaId:19,
      nomCanton: 'CENTINELA DEL CÓNDOR'
    },
    {
      id:1908,
      provinciaId:19,
      nomCanton: 'PALANDA'
    },
    {
      id:1909,
      provinciaId:19,
      nomCanton: 'PAQUISHA'
    },
    {
      id:2001,
      provinciaId:20,
      nomCanton: 'SAN CRISTÓBAL'
    },
    {
      id:2002,
      provinciaId:20,
      nomCanton: 'ISABELA'
    },
    {
      id:2003,
      provinciaId:20,
      nomCanton: 'SANTA CRUZ'
    },
    {
      id:2101,
      provinciaId:21,
      nomCanton: 'LAGO AGRIO'
    },
    {
      id:2102,
      provinciaId:21,
      nomCanton: 'GONZÁLO PIZARRO'
    },
    {
      id:2103,
      provinciaId:21,
      nomCanton: 'PUTUMAYO'
    },
    {
      id:2104,
      provinciaId:21,
      nomCanton: 'SHUSHUFINDI'
    },
    {
      id:2105,
      provinciaId:21,
      nomCanton: 'SUCUMBÍOS'
    },
    {
      id:2106,
      provinciaId:21,
      nomCanton: 'CASCALES'
    },
    {
      id:2107,
      provinciaId:21,
      nomCanton: 'CUYABENO'
    },
    {
      id:2201,
      provinciaId:22,
      nomCanton: 'ORELLANA'
    },
    {
      id:2202,
      provinciaId:22,
      nomCanton: 'AGUARICO'
    },
    {
      id:2203,
      provinciaId:22,
      nomCanton: 'LA JOYA DE LOS SACHAS'
    },
    {
      id:2204,
      provinciaId:22,
      nomCanton: 'LORETO'
    },
    {
      id:2301,
      provinciaId:23,
      nomCanton: 'SANTO DOMINGO'
    },
    {
      id:2401,
      provinciaId:24,
      nomCanton: 'SANTA ELENA'
    },
    {
      id:2401,
      provinciaId:24,
      nomCanton: 'LA LIBERTAD'
    },
    {
      id:2401,
      provinciaId:24,
      nomCanton: 'SALINAS'
    }
  ];
  //retornar las propiedades
  GetProvincias():Provincias[]{
    return this.provincias;
  }
  GetCantones():Cantones[]{
    return this.cantones;
  }
}
