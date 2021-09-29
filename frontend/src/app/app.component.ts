import { Component, VERSION } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [''],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
}
