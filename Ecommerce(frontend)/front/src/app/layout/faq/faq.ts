import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaqServices } from '../../core/service/faq-services';
import { IFAQ } from '../../models/faq.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
templateUrl: './faq.html',
// template: `  <div *ngFor="let item of this.question">
//         <!-- <p>{{question[0].answer}}</p> -->
//        <p>{{item.question}}</p>

//         <p>{{item.answer}}</p>

//     </div>`,
  styleUrl: './faq.css'
})
export class FAQ implements OnInit {
constructor(private faqServices:FaqServices, private cdr:ChangeDetectorRef){}
question!:IFAQ[];
  
ngOnInit(): void {
  this.faqServices.getQustions().subscribe({
  next: (res: any) => {
    this.question= res.data;
    for (const item in this.question)
    {
      // console.log(this.question[item]);
      this.cdr.detectChanges()
    }
  }
  })
  }

}
