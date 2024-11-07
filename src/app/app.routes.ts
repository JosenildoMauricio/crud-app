import { Routes } from '@angular/router';
import { ProdutoComponent } from './pages/produto/produto.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';

export const routes: Routes = [
    { path: '', component: CategoriaComponent },
    { path: 'produtos', component: ProdutoComponent },
    { path: 'categorias', component: CategoriaComponent }
];
