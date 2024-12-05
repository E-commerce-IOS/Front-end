import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { LoginComponent } from './login/login.component';
import { ConectaComponent } from './conecta/conecta.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { DetalhesProdutoComponent } from './detalhes-produto/detalhes-produto.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContatoComponent } from './contato/contato.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'produtos', component: ProdutosComponent},
  { path: 'carrinho', component: CarrinhoComponent},
  { path: 'login', component: LoginComponent},
  { path: 'conecta', component: ConectaComponent},
  { path: 'cadastro', component: CadastroComponent},
  { path: 'avaliacao', component: AvaliacaoComponent},
  { path: 'products/:id', component: DetalhesProdutoComponent },
  { path: 'checkout', component: CheckoutComponent},
  { path: 'contato', component: ContatoComponent}
  
];


