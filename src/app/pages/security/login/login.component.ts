import { Title } from '@angular/platform-browser';
import { AuthenticationService } from './../shared/authentication-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { first } from 'rxjs/operators';
import toastr from 'toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
// tslint:disable
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private returnUrl: string;
  descricaoModal = '';
  user: User = new User();

  imaskConfig = {
    mask: [
      {
        mask: 'a**************************************************'
      },
      {
        mask: '000.000.000-00'
      },
      {
        mask: '00.000.00000/00'
      },
      {
        mask: '00.000.000/0000-00'
      }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Login');
  }

  ngOnInit() {
    this.buildResourceForm();

    if(this.authenticationService.currentUserValue){
      this.authenticationService.logout();
      location.reload();
    }

    // get return url from route parameters or default to '/'
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.returnUrl = 'cadastrounico';
    const user: User = this.loginForm.value as User;

    this.authenticationService.login(user)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.actionsForError('Usuário e/ou senha inválidos.<br>Tente novamente. Caso tenha esquecido a senha, clique em "<a href="#cadastrounico/recuperarsenha" title="Recuperar senha">Esqueceu sua senha?</a>" para redefini-la.');
      }
    );
  }

  getModalLarge(){
    if(this.descricaoModal.length > 200)
      return true;
    return false;
  }

  private actionsForError(error) {
    toastr.error(error, {
      "debug": false,
      "positionClass": "toast-top-right",
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    });
  }

  private buildResourceForm(): void {
    this.loginForm = this.formBuilder.group({
      login: [null, [Validators.required, Validators.maxLength(255)]],
      password: [null, [Validators.required, Validators.maxLength(255)]]
    });
  }
}