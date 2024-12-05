import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../shared/ui/modal/modal.component';
import { CategoriaFormComponent } from '../categoria-form/categoria-form.component';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { ICategoria } from '../shared/models/Categoria';
@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [ModalComponent, CategoriaFormComponent],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss',
})
export class CategoriaComponent implements OnInit {
  isModalOpen = false;
  categorias: ICategoria[] = [];
  selectedCategoria!: ICategoria;

  constructor(
    private categoriaService: CategoriaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.buscaTodosCategoria();
  }

  buscaTodosCategoria() {
    this.categoriaService.buscaTodosCategoria().subscribe({
      next: (response) => {
        if (response) {
          this.categorias = response;
        }
      },
    });
  }

  carregaCategoria(categoria: ICategoria) {
    this.selectedCategoria = categoria;
    this.openModal();
  }

  deletaCategoria(id: number) {
    this.categoriaService.deletaCategoria(id).subscribe({
      next: (response) => {
        this.toastr.success("Categoria deletado com sucesso!");
        this.buscaTodosCategoria();
      },
      error: (response) => {
        if(response.error) {
          this.toastr.error(`Erro: ${response.error.detail}`);
        }
      }
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.buscaTodosCategoria();
  }
}
