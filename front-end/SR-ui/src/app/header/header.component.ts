import { Component } from '@angular/core';
import { BackEndService } from 'src/back.services';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor( private BackEndService: BackEndService) { }
  ngOnInit() {
    // this.onFetch()
  }

  // onFetch()
  // {
  //   this.BackEndService.fetchData();
  // }

}
