import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FaqServices } from '../../core/service/faq-services';
import { IFAQ } from '../../models/faq.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faqsettings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './faqsettings.html',
  styleUrls: ['./faqsettings.css'] // <-- fixed property name
})
export class Faqsettings implements OnInit{
  constructor(private faqServices: FaqServices, private cdr: ChangeDetectorRef) {}

  question: IFAQ[] = []; // initialize
  // remove uninitialized newquestion
  questionForm!: FormGroup;
  isHidden = false;
  viewMode = 'display';

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      question: new FormControl(''),
      answer: new FormControl('')
    });

    this.loadQuestions();
  }

  loadQuestions() {
    this.faqServices.getQustions().subscribe({
      next: (res: any) => {
        this.question = res?.data ?? [];
        this.cdr.detectChanges();
      },
      error: () => {
        this.question = [];
      }
    });
  }

  addQuestion(){
    if (!this.questionForm.valid) return;

    const newQ: IFAQ = {
      // fill fields expected by your model; _id may be set by backend
      _id: undefined as any,
      question: this.questionForm.value.question,
      answer: this.questionForm.value.answer
    } as IFAQ;

    // optimistically add to UI
    this.question.push(newQ);
    this.questionForm.reset();
    this.viewMode = 'display';

    this.faqServices.createQuestion(newQ).subscribe({
      next: (res: any) => {
        // if backend returns created item, update local object (e.g. set _id)
        if (res?.data) {
          const created = res.data;
          newQ._id = created._id ?? newQ._id;
        }
      },
      error: err => console.error(err)
    });
  }

  trackById(index: number, item: IFAQ) {
    return item?._id ?? index;
  }
}
