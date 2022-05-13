import { Subscription } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-form",
  template: `
    <form [formGroup]="form" class="mb-3">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input formControlName="name" type="text" class="form-control" id="name" aria-describedby="emailHelp" />
      </div>
      <div class="mb-3">
        <label for="surname" class="form-label">Surname</label>
        <input formControlName="surname" type="text" class="form-control" id="surname" aria-describedby="emailHelp" />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input formControlName="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" />
      </div>
      <button (click)="onSubmit()" [disabled]="!form.valid" type="submit" class="btn btn-danger form-control">Submit</button>
    </form>
  `,
  styles: [
    `
      input {
        border-left: 10px solid green;
      }
      input.ng-invalid {
        border-left: 10px solid red;
      }
    `,
  ],
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  sub!: Subscription;
  @Output() emptier = new EventEmitter();
  constructor(private fBuild: FormBuilder) {}
  /**
   * Subscribe to check the form at every input change
   */
  ngOnInit(): void {
    this.form = this.fBuild.group({
      name: this.fBuild.control(null, [Validators.required]),
      surname: this.fBuild.control(null, [Validators.required]),
      email: this.fBuild.control(null, [Validators.required, Validators.email]),
    });
    this.sub = this.form.valueChanges.subscribe();
  }
  /**
   * Empty the cart and reset the form
   */
  onSubmit() {
    this.emptier.emit();
    this.form.reset();
  }
  /**
   * Unsubscribe the subscription before the component destroy
   */
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
