import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ITestimonial } from '../../models/testimonial.model';
import { TestimonialService } from '../../core/service/testimonial-service';

@Component({
  selector: 'app-testimonialsettings',
  imports: [CommonModule],
  templateUrl: './testimonialsettings.html',
  styleUrl: './testimonialsettings.css'
})
export class Testimonialsettings implements OnInit{
  constructor(private testServices:TestimonialService, private cdr:ChangeDetectorRef){}
  testimonials:ITestimonial[] = [];
  isHidden = false;
  ngOnInit(): void {
    this.testServices.getTestimonials().subscribe(
      (data: ITestimonial[]) => {
        this.testimonials = data;
        this.cdr.detectChanges()
      },
      (error: { msg: any; }) => {console.error(error.msg)}
    );
  }
  hidereview(reviewId:string){
    // console.log(reviewId);
    
    this.testServices.hideReview(reviewId).subscribe(
      data=>{console.log(data);
      }
    )
    // this.isHidden= true;
    // review.isHidden = true;
    // console.log(this.isHidden, review);
    
  }

}
