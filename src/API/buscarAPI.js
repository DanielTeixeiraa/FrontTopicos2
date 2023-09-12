import {endpoint} from "./SistemAPI";

const buscaAPI = async (query) => {
    const response = await fetch( endpoint + query);
    const data = await response.json();
  
    return data.results;
  };
  
  export default buscaAPI;