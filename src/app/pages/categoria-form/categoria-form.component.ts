import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICategoria } from '../shared/models/Categoria';
import { CategoriaService } from '../../services/categoria/categoria.service';
@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.scss',
})
export class CategoriaFormComponent implements OnChanges {
  @Input() data: ICategoria | null = null;
  @Output() onCloseModel = new EventEmitter();

  categoriaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private toastr: ToastrService
  ) {
    this.categoriaForm = this.fb.group({
      nome: new FormControl('', [Validators.required])
    });
  }

  onClose() {
    this.categoriaForm.reset();
    this.onCloseModel.emit(false);
  }

  ngOnChanges(): void {
    if (this.data) {
      this.categoriaForm.patchValue({
        nome: this.data.nome
      });
    }
  }

  onSubmit() {
    if (this.categoriaForm.valid) {
      if (this.data) {
        this.categoriaService
          .atualizaCategoria(this.data.id as number, this.categoriaForm.value)
          .subscribe({
            next: (response: any) => {
              this.resetCategoriaForm();
              this.toastr.success("Categoria atualizada com sucesso!");
            },
            error: (response) => {
              if(response.error) {
                this.toastr.error(`Erro: ${response.error.detail}`);
              }
            }
          });
      } else {
        this.categoriaService.criaCategoria(this.categoriaForm.value).subscribe({
          next: (response: any) => {
            this.resetCategoriaForm();
            this.toastr.success("Categoria cadastrada com sucesso!");
          },
          error: (response) => {
            if(response.error) {
              this.toastr.error(`Erro: ${response.error.detail}`);
            }
          }
        });
      }
    } else {
      this.categoriaForm.markAllAsTouched();
    }
  }

  resetCategoriaForm() {
    this.categoriaForm.reset();
    this.onClose();
  }
}
