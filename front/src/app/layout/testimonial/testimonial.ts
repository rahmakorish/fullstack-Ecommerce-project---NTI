import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ITestimonial } from '../../models/testimonial.model';
import { TestimonialService } from '../../core/service/testimonial-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonial',
  imports: [CommonModule],
  templateUrl: './testimonial.html',
  styleUrl: './testimonial.css'
})
export class Testimonial implements OnInit{
  //establish connection
  constructor(private testServices:TestimonialService, private cdr:ChangeDetectorRef){}
  testimonials:ITestimonial[] = [];

  ngOnInit(): void {
    this.testServices.getTestimonials().subscribe(
      (data: ITestimonial[]) => {
        this.testimonials = data;
        // console.log(this.testimonials);
        this.cdr.detectChanges()
      },
      (error) => {console.error(error.msg)}
    );
  }

}
