import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FaqServices } from '../../core/service/faq-services';
import { IFAQ } from '../../models/faq.model';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-faqsettings',
  imports: [CommonModule, ReactiveFormsModule],
templateUrl: './faqsettings.html',
  styleUrl: './faqsettings.css'
})
export class Faqsettings implements OnInit{
    constructor(private faqServices:FaqServices, private cdr:ChangeDetectorRef){}
question!:IFAQ[];
questionForm!: FormGroup;
  view: 'display' | 'create' = 'display';
  ngOnInit(): void {
     this.questionForm = new FormGroup({
      question: new FormControl(''),
      answer: new FormControl('')
    });
this.loadQuestions()
 
}

loadQuestions(){
   this.faqServices.getQustions().subscribe({
  next: (res: any) => {
    this.question= res;
    this.view = 'display';
      this.cdr.detectChanges()
  }
  })
}

    addQuestion(){
    const newQ: IFAQ = {
      question: this.questionForm.value.question,
      answer: this.questionForm.value.answer
    } as IFAQ;
    
    this.faqServices.createQuestion(newQ)?.subscribe(data=>{
          this.questionForm.reset();
          this.loadQuestions()
    })
  }
  
  }

