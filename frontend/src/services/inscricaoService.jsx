import axios from 'axios';
import BASE_URL from '../constants/base_url';

async function inscreverService(inscreverPayload) {
  const URL = `${BASE_URL}/inscricao`;
 
  try{
    const response = await axios.post(URL, inscreverPayload);

    return response;
  }catch(error){
    console.log(error);
  }
  

  
}
async function listagemInscricaoService() {
    const URL = `${BASE_URL}/inscricao`;
  
    const token = localStorage.getItem('token');
  
    try {
        const response = await axios.get(URL,{
            headers: {
            'Authorization': `Bearer ${token}`,
            }
        });
      return response;
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
}



async function excluiInscricaoService(id) {

    const URL = `${BASE_URL}/inscricao/${id}`;
  
    const token = localStorage.getItem('token');
  
    try {
        const response = await axios.delete(URL,{
            headers: {
            'Authorization': `Bearer ${token}`,
            }
        });
      return response;
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
}


async function editaInscricaoService(id, dados) {

  const URL = `${BASE_URL}/inscricao/${id}`;

  const token = localStorage.getItem('token');

  try {
      const response = await axios.put(URL,dados,{
          headers: {
          'Authorization': `Bearer ${token}`,
          }
      });
    return response;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

async function quantidadeInscricaoService() {
  const URL = `${BASE_URL}/inscricao-quantidade`;

  const token = localStorage.getItem('token');

  try {
      const response = await axios.get(URL,{
          headers: {
          'Authorization': `Bearer ${token}`,
          }
      });
    return response;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}


export {
    inscreverService,
    listagemInscricaoService,
    editaInscricaoService,
    excluiInscricaoService,
    quantidadeInscricaoService
}