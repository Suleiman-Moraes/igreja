import { AuthenticationService } from './pages/security/shared/authentication-service.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'dividaativa';
  public showTemplate: boolean = true;
  public static myPag: string = "Home";
  userActivity;
  userInactive: Subject<any> = new Subject();

  constructor(
    private authenticationService: AuthenticationService
  ){
    this.verificar();
    this.setTimeout();
    this.userInactive.subscribe(() => this.deslogarUsuario());
  }

  ngOnInit() {
    this.verificar();
  }

  get myPagName(): string{
    return AppComponent.myPag
  }

  showContentWrapper(){
    return{
      'content-wrapper': this.showTemplate
    }
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 3600000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  //PRIVATE METHODS
  private verificar(){
    const currentUser = this.authenticationService.currentUserValue;
    if (!currentUser) {
      // this.authenticationService.showTemplate.emit(true);
      this.showTemplate = false;
    }
    this.authenticationService.showTemplate.subscribe(
      show => {
        this.showTemplate = show;
      }
    );
  }

  private deslogarUsuario(): void{
    this.authenticationService.logout();
    // window.location.href = CADU_LOGIN; url de login
  }
}
