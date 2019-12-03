import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  cadastroUnico = 'home';

  constructor(
    private titleService: Title
  ) { }

  ngOnInit() {
    // tslint:disable-next-line: triple-equals
    if (this.titleService.getTitle() == 'Login') {
      this.titleService.setTitle('Igreja');
      location.reload();
    }
  }

  getUrlLink(teste: string) {
    return this.cadastroUnico.valueOf() + teste;
  }
}
