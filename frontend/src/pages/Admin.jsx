import { Flex, Box, Center, FormControl, HStack, Button, Image } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
import { useContext } from "react";
import UserContext from "../context/UserContext";

function Admin() {
  const history = useHistory();

  const { user, logOut } = useContext(UserContext);

  const handleCadastroFuncionarios = () => {
    history.push('/cadastro-usuario')
  }

  const handleGestaoUsuarios = () => {
    history.push('/gestao-usuarios')
  }

  const handleAgendamentos = () => {
    history.push('/inscricoes')
  }


  if (!user || user.cargo.toLowerCase() !== 'administrador') {
    history.push('/login')
  }

  return (
    <Box h="100vh" position="relative">
      {/* Logo */}
      <Image 
        src="/logo.png" 
        alt="Logo" 
        h={{ base: 20, md: 32 }}
        maxW="100%"
        position="absolute" 
        top={{ base: 4, md: 2}} 
        left={4} 
        zIndex={1} 
      />

      {/* Botão de Sair */}
      <Button
        w={{ base: 90, md: 200 }}
        p="6"
        type="button"
        bg="#D73350"
        color="white"
        fontWeight="bold"
        fontSize="xl"
        mt="2"
        ml="2"
        _hover={{ bg: "red.500" }}
        h={{ base: 50, md: "auto"}}
        position="absolute"
        top={6}
        right={2}
        zIndex={1}
        onClick={logOut}
      >
        Sair
      </Button>

      {/* Título para telas grandes */}
      <Center
        as="header"
        h={140}
        bg="#D73350"
        color="white"
        fontWeight="bold"
        fontSize={{ base: '2xl', md: '4xl' }}
        pb="8"
      >
        Administração
      </Center>

      {/* Conteúdo central responsivo */}
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
            gap="4"
          >

            <HStack spacing="4" justify="center">
              <Button
                w={240}
                p="6"
                type="submit"
                bg="#D73350" // Alteração aqui para cor preta
                color="white"
                fontWeight="bold"
                fontSize="xl"
                mt="2"
                ml="2"
                _hover={{ bg: "gray.900" }}
                h="auto"
                onClick={ handleCadastroFuncionarios }
              >
                Cadastrar Usuários
              </Button>
            </HStack>
            <HStack spacing="4" justify="center">
              <Button
                w={240}
                p="6"
                type="submit"
                bg="#D73350" // Alteração aqui para cor preta
                color="white"
                fontWeight="bold"
                fontSize="xl"
                mt="2"
                ml="2"
                _hover={{ bg: "gray.900" }}
                h="auto"
                onClick={ handleGestaoUsuarios }
              >
                Gestão de Usuários
              </Button>
            </HStack>
            <HStack spacing="4" justify="center">
              <Button
                w={240}
                p="6"
                type="submit"
                bg="#D73350" // Alteração aqui para cor preta
                color="white"
                fontWeight="bold"
                fontSize="xl"
                mt="2"
                ml="2"
                _hover={{ bg: "gray.900" }}
                h="auto"
                onClick={ handleAgendamentos }
              >
                Inscrições
              </Button>
            </HStack>
          </FormControl>
        </Center>
      </Flex>
    </Box>
  );
}

export default Admin;