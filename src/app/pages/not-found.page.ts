import { Component, OnInit } from "@angular/core";

@Component({
  template: `
    <div class="container text-center">
      <img class="mt-5" src="https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_auto/c_scale,w_300/v1/Dev/newcom/global/404-variant-1" alt="" />
      <h1 class="mt-3">Whoops!</h1>
      <p>
        The info you're looking for can't be found! <br />
        You might want to try searching again or explore one of the links above.
      </p>
    </div>
  `,
  styles: [],
})
export class NotFoundPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
