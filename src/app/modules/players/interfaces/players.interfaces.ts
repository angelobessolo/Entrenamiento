export interface Players {
  code: string;         
  names: string;         
  shirt: string;
  country?: string;  // Añadir una nueva propiedad llamada "country" para almacenar el país del jugador       
  team: string;          
  cups: string; 
  shoCups?: boolean;  
}