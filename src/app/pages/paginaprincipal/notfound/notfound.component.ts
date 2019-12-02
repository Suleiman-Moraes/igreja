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
    if (this.titleService.getTitle() == 'Login') {
      this.titleService.setTitle("Dívida Ativa");
      location.reload();
    }
  }

  getUrlLink(teste:string){
    return this.cadastroUnico.valueOf() + teste;
  }
}
