import { Box, Center, Image, Flex, FormControl, HStack, FormLabel, Input, Button, RadioGroup, Radio, CheckboxGroup, VStack } from '@chakra-ui/react';
import Select from 'react-select'
import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { inscreverService } from '../services/inscricaoService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToastError, showToastSuccess } from '../utils/Toastify';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import UserContext from '../context/UserContext';
import InputMask from 'react-input-mask';

const Inscrever = () => {
  const history = useHistory();

  const { user } = useContext(UserContext);

  const [nome, setNome] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [celular, setCelular] = useState('');
  const [instagram, setInstagram] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep,setCep] = useState('');
  const [endereco, setEndereco] = useState('');

  const estadosOptions = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' }
  ];

  const handleSelectEstado = (selectedOptions) => {
    setEstado(selectedOptions.value);
  };
  
  const inscrever = async () => {

    try {
      const response = await inscreverService({
        nome,
        cpf_cnpj: cpfCnpj,
        celular,
        instagram,
        estado,
        cidade, 
        endereco,
        cep
      });

      if (response) {
        showToastSuccess("Inscrição realizada com sucesso.")
      }

    } catch (e) {
      const messageError = e.response.data.mensagem;

      showToastError(messageError) //! Toastify disparando um alerta de erro

      console.log(e);
    }
  }

const handleLogin = () =>{
  history.push('/login');
}
  
  return (
    <Box h="100vh" position="relative">
      {/* Imagem para telas grandes */}
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
      <Center
        as="header"
        h={140}
        bg="#D73350"
        color="white"
        fontWeight="bold"
        fontSize={{ base: 'xl', md: '4xl' }}
        pb="8"
      >
        {/* Título para telas grandes */}
        Inscrição
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
          <FormControl 
            display="flex" 
            flexDir="column" 
            gap="6"
            maxW="600px"
            mx="auto"
          >
            <HStack
              flexWrap="wrap"
              spacing={{ base: "2", md: "4" }}
            >
              <Box w={{ base: "100%", md: "48%" }}>
                <FormLabel htmlFor="nome">Nome Completo</FormLabel>
                <Input 
                  id="nome"
                  type="text"
                  placeholder="Digite seu Nome"
                  value={ nome }
                  onChange={ ({ target: { value } }) => setNome(value) }
                />
              </Box>
              <Box w={{ base: "100%", md: "48%" }}>
                <FormLabel htmlFor="cpfCnpj">CPF/CNPJ</FormLabel>
                <InputMask
                  mask="999.999.999-99"
                  maskChar="_"
                  value={cpfCnpj}
                  onChange={({ target: { value } }) => setCpfCnpj(value)}
                >
                  {(inputProps) => <Input {...inputProps} id="cpfCnpj" placeholder="Seu CPF ou CNPJ" />}
                </InputMask>
              </Box>
      
            </HStack>
            <HStack 
              spacing="4"
            >
              <Box w="100%">
                <FormLabel htmlFor="cel">Celular</FormLabel>
                <InputMask
                  mask="(99) 99999-9999"
                  maskChar="_"
                  value={celular}
                  onChange={({ target: { value } }) => setCelular(value)}
                >
                  {(inputProps) => <Input {...inputProps} id="cel" placeholder="Digite seu Celular" />}
                </InputMask>
              </Box>
              <Box w={{ base: "100%" }}>
                <FormLabel htmlFor="instagram">Instagram</FormLabel>
                <Input 
                  id="nasc" 
                  type="text"
                  placeholder="Digite seu usuário sem o @"
                  value={ instagram }
                  onChange={ ({ target: { value } }) => setInstagram(value) }
                />
              </Box>
            </HStack>
            <HStack 
              flexWrap="wrap"
              spacing={{ base: "2", md: "4" }}
            >
              <Box w={{ base: "100%", md: "48%" }}>
                <FormLabel htmlFor="estado">Estado</FormLabel>
                <Select options={ estadosOptions } 
                placeholder="Escolha seu estado"
                onChange={ handleSelectEstado }/>
              </Box>
              <Box w={{ base: "100%", md: "48%" }}>
                <FormLabel htmlFor="cidade">Cidade</FormLabel>
                <Input 
                  id="cidade"
                  type="text"
                  placeholder="Cidade onde reside"
                  value={ cidade }
                  onChange={ ({ target: { value } }) => setCidade(value) }
                />
              </Box>
            </HStack>
            <HStack 
              flexWrap="wrap"
              spacing={{ base: "2", md: "4" }}
            >
              <Box w={{ base: "100%", md: "48%" }}>
                <FormLabel htmlFor="cep">CEP</FormLabel>
                <InputMask
                  mask="99999-999"
                  maskChar="_"
                  value={cep}
                  onChange={({ target: { value } }) => setCep(value)}
                >
                  {(inputProps) => <Input {...inputProps} id="cel" placeholder="Digite seu Celular" />}
                </InputMask>
              </Box>
              <Box w={{ base: "100%", md: "48%" }}>
                <FormLabel htmlFor="endereco">Endereço</FormLabel>
                <Input 
                  id="endereco"
                  type="text"
                  placeholder="Digite seu Endereço"
                  value={ endereco }
                  onChange={ ({ target: { value } }) => setEndereco(value) }
                />
              </Box>
            </HStack>
            <HStack justify="center">
              <Flex justify="space-between">
                <Button
                  w={{ base: 120, md: 240 }}
                  p="6"
                  type="submit"
                  bg="#D73350"
                  color="white"
                  fontWeight="bold"
                  fontSize="xl"
                  mt="2"
                  _hover={{ bg: "gray.900" }}
                  h="auto"
                  onClick={ inscrever }
                >
                  Inscrever
                </Button>
              </Flex>
              <Flex justify="space-between">
                <Button
                  w={{ base: 120, md: 240 }}
                  p="6"
                  type="submit"
                  bg="#D73350"
                  color="white"
                  fontWeight="bold"
                  fontSize="xl"
                  mt="2"
                  _hover={{ bg: "gray.900" }}
                  h="auto"
                  onClick={ handleLogin }
                >
                  Login
                </Button>
              </Flex>
            </HStack>
          </FormControl>
        </Center>
      </Flex>

      <ToastContainer />
    </Box>
  );
}

export default Inscrever;
