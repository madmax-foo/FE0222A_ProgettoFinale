import { statoFattura } from "./statofattura";

export class Fattura{
  id!:number;

  data!:string;
  numero!:number;
  anno!:number;
  importo!:number;
  stato!:statoFattura;
  cliente!:any


}


