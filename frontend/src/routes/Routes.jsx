import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import Inscrever from '../pages/Inscrever';
import GestaoUsuarios from '../pages/GestaoUsuarios';
import Inscricoes  from '../pages/Inscricoes'
import EditarUsuario from '../pages/EditarUsuario';
import EditarInscricao from '../pages/EditarInscricao';
import CadastroUsuario from '../pages/CadastroUsuario';

function Routes() {

  return (
    <Switch>
      <Route exact path="/login" component={ Login }/>
      <Route exact path="/administrador" component={ Admin }/>
      <Route exact path="/cadastro-usuario" component={ CadastroUsuario }/>
      <Route exact path="/" component={ Inscrever }/>
      <Route exact path="/gestao-usuarios" component={ GestaoUsuarios }/>
      <Route exact path="/inscricoes" component={ Inscricoes }/>
      <Route exact path="/editar-usuarios/:id" component={ EditarUsuario }/>
      <Route exact path="/editar-inscricao/:id" component={ EditarInscricao }/>
    </Switch>
  )
}

export default Routes
