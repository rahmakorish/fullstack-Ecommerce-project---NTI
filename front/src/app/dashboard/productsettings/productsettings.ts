import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../core/service/product-services';
import { IProduct } from '../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-productsettings',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './productsettings.html',
  styleUrl: './productsettings.css'
})
export class Productsettings implements OnInit{
  staticURL: string = 'http://localhost:3000/uploads/'; // Assuming this is the static URL for images
  constructor(private _productService:Product, private dcr:ChangeDetectorRef, private http:HttpClient,
  ){}
  //navbar functions
    viewProducts = false; 
    toggleProducts() {
      this.viewProducts = !this.viewProducts;
    }

    trackByProductId(index: number, product: IProduct): string {
      return product._id;
    }
  products!:IProduct[]
  // newProduct!:IProduct;
  productForm!: FormGroup;
  categories = ['skin care', 'clothing', 'accessories', 'books', 'food & beverages']


  createEmptyProduct(): IProduct {
    return {
      _id: '',
      name: '',
      description: '',
      price: 0,
      imgURL: '',
      slug: '',
      stock: 0,
      category: '',
      rating: 0
    };
  }
  newProduct = this.createEmptyProduct()

  //create new form for new product
    ngOnInit(): void {
        this.productForm = new FormGroup({
          name: new FormControl(''),
          description: new FormControl(''),
          price:new FormControl(''),
          slug:new FormControl(''),
          stock:new FormControl(''),
          category:new FormControl(''),
          rating:new FormControl(''),
          imgURL:new FormControl(''),
        });

          this._productService.getProducts().subscribe({
        next:res=>{
          this.products=res.data
          // this.cartData=res.data
          // console.log(this.products);

          this.dcr.detectChanges()
        },
        error:err=>console.log(err.message)
      })
          this.dcr.detectChanges()
    }

    selectedFile: File | null = null;

    onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
      } else {
        this.selectedFile = null;
      }
    }

  //patch data from form into empty cartona 
  // onSubmit() {
  // this.newProduct.name=this.productForm.value.name,
  // this.newProduct.description=this.productForm.value.description,        
  // this.newProduct.price=this.productForm.value.price,
  // this.newProduct.slug=this.productForm.value.slug,
  // this.newProduct.stock=this.productForm.value.stock,
  // this.newProduct.category=this.productForm.value.category,
  // this.newProduct.rating=this.productForm.value.rating,
  // this.newProduct.imgURL=this.productForm.value.imgURL,
  // console.log(this.newProduct);
  // this.createProduct()
  // }

    onSubmit() {
      // build FormData
      const formData = new FormData();
      formData.append('name', this.productForm.value.name || '');
      formData.append('description', this.productForm.value.description || '');
      formData.append('price', String(this.productForm.value.price || 0));
      formData.append('slug', this.productForm.value.slug || '');
      formData.append('stock', String(this.productForm.value.stock || 0));
      formData.append('category', this.productForm.value.category || '');
      formData.append('rating', String(this.productForm.value.rating || 0));
      if (this.selectedFile) {
        formData.append('imgURL', this.selectedFile, this.selectedFile.name);
      }

      this.createProduct(formData);
    }


    createProduct(data: FormData){
      this._productService.createProduct(data).subscribe({
        next: data => {
          // console.log('created product:', data);
  //clear form after submotting new product 
        this.productForm.reset();
        this.selectedFile = null;
        this.productForm.markAsPristine();
        this.productForm.markAsUntouched();
        this.dcr.detectChanges();
        },
        error: err => console.error(err)
      });
    }
}
