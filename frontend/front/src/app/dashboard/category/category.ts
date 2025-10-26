import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Categoryservice } from '../../core/service/category-service';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../../models/category.model';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category implements OnInit {
  constructor(private categoryServices: Categoryservice, private cdr: ChangeDetectorRef,
    private _http: HttpClient
  ){}
  category!: ICategory;
  categories: ICategory[] = [];
  categoryForm!: FormGroup;
  showForm = false;

  ngOnInit(): void {
    //create form for new category input
    this.categoryForm = new FormGroup({
      category:new FormControl(''),
      subcategory: new FormControl('')
    })
    this.getAll();
  }

  getAll() {
    this.categoryServices.getCategories().subscribe(data => {
            // console.log(data);
      this.categories = data;
      console.log(this.categories);
      
      this.cdr.detectChanges();
    });
  }
// toggle form visibility
  toggleForm(show?: boolean) {
    this.showForm = typeof show === 'boolean' ? show : !this.showForm;
    if (this.showForm) {
      // optionally reset form when opened
      this.categoryForm.reset();
    }
  }

//get data from form and deliver it to function
  onSubmit() {
    const category = this.categoryForm.value.category;
    const subcategory = this.categoryForm.value.subcategory
    this.categoryServices.createNewCategory(category, subcategory).subscribe({
      next: data => {
        // console.log('created', data);
        this.toggleForm(false);
        this.getAll();
      },
      error: err => {console.error(err);}
    });
  }
}

