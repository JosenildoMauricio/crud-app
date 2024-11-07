import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../shared/ui/modal/modal.component';
import { ProdutoFormComponent } from '../produto-form/produto-form.component';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from '../../services/produto/produto.service';
import { IProduto } from '../shared/models/Produto';
@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [ModalComponent, ProdutoFormComponent],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss',
})
export class ProdutoComponent implements OnInit {
  isModelOpen = false;
  produtos: IProduto[] = [];
  produto!: IProduto;

  constructor(
    private produtoService: ProdutoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.buscaTodosProduto();
  }

  buscaTodosProduto() {
    this.produtoService.buscaTodosProduto().subscribe({
      next: (response) => {
        if (response) {
          this.produtos = response;
        }
      },
      error: (response) => {
        if(response.error) {
          this.toastr.error(`Erro: ${response.error.detail}`);
        }
      }
    });
  }

  carregaProduto(produto: IProduto) {
    this.produto = produto;
    this.openModel();
  }

  deletaProduto(id: number) {
    this.produtoService.deletaProduto(id).subscribe({
      next: (response) => {
        this.toastr.success("Produto deletado com sucesso!");
        this.buscaTodosProduto();
      },
      error: (response) => {
        if(response.error) {
          this.toastr.error(`Erro: ${response.error.detail}`);
        }
      }
    });
  }

  openModel() {
    this.isModelOpen = true;
  }

  closeModel() {
    this.isModelOpen = false;
    this.buscaTodosProduto();
  }
}
