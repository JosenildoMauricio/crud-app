import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { IProduto } from '../shared/models/Produto';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdutoService } from '../../services/produto/produto.service';
import { ToastrService } from 'ngx-toastr';
import { UnidadeMedida, UnidadeMedidaToStringMapping, StringToEnumMapping, convertStrToEnum } from '../shared/models/UnidadeMedida';
import { ICategoria } from '../shared/models/Categoria';
import { CategoriaService } from '../../services/categoria/categoria.service';
@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.scss',
})
export class ProdutoFormComponent implements OnChanges {
  @Input() data: IProduto | null = null;
  @Output() onCloseModal = new EventEmitter();

  produtoForm!: FormGroup;

  categorias: ICategoria[] = [];
  selectedCategoria?: ICategoria;
  selectedUnidadeMedida?: UnidadeMedida;

  unidadeMedidaToStringMapping = UnidadeMedidaToStringMapping;
  stringToEnumMapping = StringToEnumMapping;
  unidadesMedidas = Object.keys(UnidadeMedida);

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private toastr: ToastrService
  ) {
    this.buscaTodosCategoria();
    this.produtoForm = this.fb.group({
      nome: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required]),
      unidadeMedida: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required])
    });
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

  onClose() {
    this.produtoForm.reset();
    this.onCloseModal.emit(false);
  }

  ngOnChanges(): void {
    if (this.data) {
      
      this.selectedCategoria = this.data.categoria
      
      this.produtoForm.patchValue({
        nome: this.data.nome,
        valor: this.data.valor,
        unidadeMedida: this.data.unidadeMedida,
        categoria: this.selectedCategoria
      });
    }
  }

  onChangeCategoria(): void {
    let formValues = this.produtoForm.value as IProduto
    const categoria = formValues.categoria as ICategoria
    this.selectedCategoria = categoria
  }

  onChangeUnidadeMedida(): void {
    let formValues = this.produtoForm.value as IProduto;
    const unidadeMedida = formValues.unidadeMedida as UnidadeMedida;
    this.selectedUnidadeMedida = unidadeMedida
  }

  onSubmit() {
    if (this.produtoForm.valid) {
      if (this.data) {
        this.produtoService
          .atualizaProduto(this.data.id as number, this.produtoForm.value)
          .subscribe({
            next: (response: any) => {
              this.resetProdutoForm();
              this.toastr.success("Produto atualizado com sucesso!");
            },
            error: (response) => {
              if(response.error) {
                this.toastr.error(`Erro: ${response.error.detail}`);
              }
            }
          });
      } else {
        this.produtoService.criaProduto(this.produtoForm.value).subscribe({
          next: (response: any) => {
            this.resetProdutoForm();
            this.toastr.success("Produto cadastrado com sucesso!");
          },
          error: (response) => {
            if(response.error) {
              this.toastr.error(`Erro: ${response.error.detail}`);
            }
          }
        });
      }
    } else {
      this.produtoForm.markAllAsTouched();
    }
  }

  resetProdutoForm() {
    this.produtoForm.reset();
    this.onClose();
  }
}
