import { Component, VERSION } from '@angular/core'

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [''],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
}
