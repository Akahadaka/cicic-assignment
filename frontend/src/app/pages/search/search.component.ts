import { Component, OnInit } from '@angular/core'
import { DataService } from '@app/data/data.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(private dataService: DataService) {
    // test
    this.dataService.getData();
  }

  ngOnInit() {}
}
