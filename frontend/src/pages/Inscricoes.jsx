
import { useState, useEffect, useContext } from 'react';
import { Flex, Box, Center, FormControl, HStack, Button, Image, Input, Text,VStack } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
import { listagemInscricaoService, excluiInscricaoService,quantidadeInscricaoService } from '../services/inscricaoService'
import { MdEdit, MdDelete } from 'react-icons/md';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { showToastError, showToastSuccess } from "../utils/Toastify";
import { ArrowLeftIcon } from '@chakra-ui/icons';
import UserContext from '../context/UserContext';

function Inscricoes() {
  //--------------------------------------- Consts -------------------------------------------------------------------
  const history = useHistory();

  const { user } = useContext(UserContext);

  const [inscricoes, setIncricoes] = useState([]);
  const [quantidadeInscricao, setQuantidadeInscricao] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6; 
 

//--------------------------------------------------- Handles -------------------------------------------------------
  const handleAgendar = () => {
    history.push('/agendar')
  }


  const handleDelete = async (id) =>{
    try {
      const response = await excluiInscricaoService(id);

      showToastSuccess("Excluiu inscricao com sucesso.");

      await fetchInscricao();

    } catch(error) {
      const messageError = error.response.data.mensagem;

      showToastError(messageError)

      console.log(error);
    }
  }

  const handleEditar = (id) => {
    history.push(`/editar-inscricao/${id}`);
  };


  const handleLogin = () => {
    history.push('/administrador')
  }

  const handleLoadMore = async () => {
    try {
        const nextPage = page + 1;
        const response = await listagemInscricaoService(nextPage, pageSize);
        if(response.data.length!==0){
          const newInscricoes = response.data.map(ag => ({
            id:ag.id,
            nome:ag.nome,
            cpf_cnpj: ag.cpf_cnpj,
            instagram: ag.instagram,
            celular: ag.celular,
            cidade: ag.cidade,
            estado: ag.estado,
            endereco:ag.endereco,
            cep:ag.cep
          }));
          setIncricoes([...inscricoes, ...newInscricoes]);
          setPage(nextPage);
        }
        else{
          showToastError("Não possuem mais agendamentos a serem carregados.");
        }
        
      } catch (error) {
        console.error(error);
      }
  };
//---------------------------------------------------- Use Effect ----------------------------------------------------------
  const fetchInscricao = async () => {
    try {
      const response = await listagemInscricaoService();
      const inscricao = response.data.map(ag => ({
        id:ag.id,
        nome:ag.nome,
        cpf_cnpj: ag.cpf_cnpj,
        instagram: ag.instagram,
        celular: ag.celular,
        cidade: ag.cidade,
        estado: ag.estado,
        endereco:ag.endereco,
        cep:ag.cep
      }));
      setIncricoes(inscricao);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchQuantidadeInscricao = async () => {
    try {
      const response = await quantidadeInscricaoService();
      const quantidadeInscricao = response.data[0].total
      setQuantidadeInscricao(quantidadeInscricao);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuantidadeInscricao();
  }, []); 

  useEffect(() => {
    fetchInscricao();
  }, []); 

  if (!user || user.cargo.toLowerCase() !== 'administrador') {
    history.push('/')
  }

//------------------------------------------------------------------------ return -------------------------------------------------
  return (
    <Box h="100vh" position="relative">
      <Image
        src="/logo.png"
        alt="Logo"
        h={{ base: 16, md: 32 }}
        maxW="100%"
        position="absolute"
        top={{ base: 6, md: 1 }}
        right={{ base: 1, md: 10 }}
        zIndex={1}
      />

      <Button
        w={{ base: 70, md: 0 }}
        p="4"
        type="button"
        bg="#D73350"
        color="white"
        _hover={{ bg: "blue.500" }}
        position="absolute"
        top={9}
        left={6}
        zIndex={1}
        onClick={ handleLogin }
      >
        <ArrowLeftIcon />
      </Button>

      <Center
        as="header"
        h={150}
        bg="#D73350"
        color="white"
        fontWeight="bold"
        fontSize={{ base: '2xl', md: '4xl' }}
        pb="8"
      >
        Inscrições
      </Center>

      <Flex
        align="center"
        justify="center"
        bg="blackAlpha.200"
        h="calc(100vh - 150px)"
      >
        <Center
          w="100%"
          maxW={840}
          bg="white"
          top={{ base: 50, md: '100px' }}
          position="absolute"
          borderRadius={5}
          p="6"
          boxShadow="0 1px 2px #ccc"
          mt={{ base: 50, md: 0 }}
        >
          <FormControl display="flex" flexDir="column" gap="4">
          <VStack spacing="4">
            <Box>
              <Text fontWeight="bold"><strong>Quantidade de Inscritos</strong>: {quantidadeInscricao}</Text>
            </Box>
          </VStack>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              { inscricoes.map(inscricao => (
              <Box key={ inscricao.id } bg="gray.100" p="4" borderRadius="md" style={{ marginBottom: '12px' }}>
                <HStack spacing="4" justify="center">
                  <li>
                    <strong>Nome Inscrito:</strong> { inscricao.nome } - <strong>CPF/CNPJ:</strong> { inscricao.cpf_cnpj } - <strong>Instagram:</strong> { inscricao.instagram } -  <strong>Celular: </strong> 
                    { inscricao.celular} <strong>Cidade:</strong> { inscricao.cidade } - <strong>Estado:</strong> { inscricao.estado } - <strong>Endereço:</strong> {inscricao.endereco} - <strong>CEP:</strong> {inscricao.cep}
                  </li>

                  <Button
                    _hover={{ 
                      bg: "blue.300",
                      color: "white"
                    }}
                    onClick={() => handleEditar(inscricao.id)}
                  >
                    <MdEdit />
                  </Button>

                  <Button
                    _hover={{ 
                      bg: "red.400",
                      color: "white"
                    }}
                    onClick={() => handleDelete(inscricao.id)}
                  >
                    <MdDelete />
                  </Button>
                </HStack>
              </Box>
              ))}
            </ul>
            <VStack spacing="4">
                <Box  mb="10">
                    <Button
                    p="4"
                    type="button"
                    bg="gray.900"
                    color="white"
                    _hover={{ bg: "blue.500" }}
                    position="absolute"
                    bottom={8}
                    left="50%"
                    transform="translateX(-50%)"
                    onClick={handleLoadMore}
                    >
                    Carregar Mais 
                    </Button>
                </Box> 
            </VStack>
          </FormControl>
        </Center>
      </Flex>

      <ToastContainer />
    </Box>
  );
}

export default Inscricoes;