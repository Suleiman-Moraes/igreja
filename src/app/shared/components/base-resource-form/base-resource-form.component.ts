import { AuthenticationService } from './../../../pages/security/shared/authentication-service.service';
import toastr from "toastr";
import { MessageService, ConfirmationService } from 'primeng/api';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ResponseApi } from '../../models/response-api.model';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

    currentAction: string;
    pageTitle: string;
    resource: T;
    resourceForm: FormGroup;
    urlList: string = '/dividaativa';
    maxDate: Date = new Date();
    minDate: Date = new Date();
    tipos: string[] = ['pdf', 'doc', 'docx', 'png', 'PNG', 'jpg', 'xls'];

    protected route: ActivatedRoute;
    protected router: Router;
    protected formBuilder: FormBuilder;
    protected messageService: MessageService;
    protected authenticationService: AuthenticationService;
    confirmationService: ConfirmationService;
    protected toast;

    constructor(
        protected injector: Injector,
        protected resourceService: BaseResourceService<T>,
        protected jsonDataToResourceFn: (jsonData: any) => T
    ) {
        this.route = this.injector.get(ActivatedRoute);
        this.router = this.injector.get(Router);
        this.formBuilder = this.injector.get(FormBuilder);
        this.messageService = this.injector.get(MessageService);
        this.authenticationService = this.injector.get(AuthenticationService);
        this.confirmationService = this.injector.get(ConfirmationService);
        this.toast = toastr;
    }

    ptBR = {
        firstDayOfWeek: 0,
        dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
        dayNamesMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa"],
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        today: 'Hoje',
        clear: 'Limpar'
    };

    maskInter = {
        mask: Number,
        scale: 0,
        thousandsSeparator: '',
        padFractionalZeros: false,
        normalizeZeros: false,
        radix: ','
    };

    maskInter2 = {
        mask: [{ mask: '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000' }]
    };

    maskInter3 = {
        mask: [{ mask: '0' }, { mask: '-0' },
        { mask: '00' }, { mask: '-00' },
        { mask: '000' }, { mask: '-000' },
        { mask: '0.0' }, { mask: '-0.0' },
        { mask: '0.00' }, { mask: '-0.00' },
        { mask: '00.0' }, { mask: '-00.0' },
        { mask: '00.00' }, { mask: '-00.00' }]
    };

    maskMoney = {
        mask: Number,
        scale: 2,
        thousandsSeparator: '.',
        padFractionalZeros: true,
        normalizeZeros: true,
        min: 0,
        max: 99999999,
        radix: ','
    };

    maskCnpjCpfCei = {
        mask: [
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

    maskCnpjOrCpf = {
        mask: [
            {
                mask: '000.000.000-00'
            },
            {
                mask: '00.000.000/0000-00'
            }
        ]
    };

    maskCpf = {
        mask: [
            {
                mask: '000.000.000-00'
            }
        ]
    };

    maskTelefone = {
        mask: [
            {
                mask: '(00)0000-0000'
            },
            {
                mask: '(00)00000-0000'
            }
        ]
    };

    maskPlaca = {
        mask: [
            {
                mask: 'aaa0a00'
            },
            {
                mask: 'aaa0000'
            }
        ]
    };

    situacoes = {
        ATIVO: 'Ativo',
        INATIVO: 'Inativo'
    };

    ngOnInit() {
        this.setCurrentAction();
        this.buildResourceForm();
        this.loadResource();
        this.posNgOnInit();
    }

    ngAfterContentChecked() {
        this.setPageTitle();
        this.posNgAfterContentChecked();
    }

    get situacaoOptions(): Array<any> {
        return this.getTypes(this.situacoes);
    }

    convertToNumber(string: string): number {
        return new Number(string).valueOf()
    }

    submitForm(): void {
        this.beforeSubmitForm();
        this.resource = this.jsonDataToResourceFn(this.resourceForm.value);
        this.resourceService.enviarFormulario(this.resource, (this.resource.id != null && this.resource.id > 0)).subscribe(
            responseApi => {
                this.tratarResponseSubimit(responseApi);
            }, err => {
                this.tratarErro(err);
            }
        );
    }

    confirmDialog(message: string, header: string, icon: string): void {
        this.confirmationService.confirm({
            message: message,
            header: header,
            icon: icon,
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.acceptOrRejectConfirmDialog(true);
            },
            reject: () => {
                this.acceptOrRejectConfirmDialog(false);
            }
        });
    }

    inativarCampo(value: boolean, name: string, form: FormGroup): void {
        if (value) {
            form.get(name).setValue('Não Possui');
        }
        else {
            form.get(name).setValue(null);
        }
    }

    //PRIVATES METHODS
    protected setCurrentAction() {
        if (this.route.snapshot.url[0].path == "new") {
            this.currentAction = "new";
        }
        else {
            this.currentAction = "edit";
        }
    }

    protected setPageTitle() {
        if (this.currentAction == "new") {
            this.pageTitle = this.createPageTitle();
        }
        else {
            this.pageTitle = this.editionPageTitle();
        }
    }

    protected createPageTitle(): string {
        return 'Novo';
    }

    protected editionPageTitle(): string {
        return 'Edição';
    }

    protected showError(detail: string) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: detail });
    }

    protected loadResource(): void {
        if (this.currentAction == 'edit') {
            let id: string = '';
            this.route.paramMap.pipe(
                switchMap(params => params.get('id'))
            ).subscribe(
                (param) => {
                    id += param;
                }
            );
            this.resourceService.getById(Number(id)).subscribe(
                (responseApi: ResponseApi) => {
                    if (responseApi.data == null) {
                        responseApi.erros.forEach(x => {
                            this.showError(x);
                        });
                    }
                    else {
                        this.resource = responseApi.data;
                        if (this.resource.id == null) {
                            this.showError('Nenhum Registro encontrado.');
                        }
                        this.resourceForm.patchValue(this.resource);
                        this.posLoadResource();
                    }
                }, err => {
                    this.tratarErro(err);
                }
            );
        }
    }

    protected tratarErro(err: any): void {
        if (err.status != 400) {
            this.erroServidor();
        }
        else {
            err.error.erros.forEach(x => {
                this.showError(x);
            });
        }
    }

    protected erroServidor(): void {
        this.authenticationService.logout();
        toastr.error("Erro no servidor, tente novamente mais tarde");
        this.router.navigate(["login"]);
    }


    protected selecionarCombosDiversas(form: FormGroup, lista: any, id: number, controlName: string): void {
        lista.forEach((x: BaseResourceModel) => {
            if (x.id == id) {
                form.get(controlName).setValue(x);
                return;
            }
        });
    }

    protected getTypes(type: any): any {
        return Object.entries(type).map(
            ([value, text]) => {
                return {
                    text: text,
                    value: value
                }
            }
        );
    }

    protected tratarResponseSubimit(responseApi: ResponseApi): void {
        if (responseApi.data != null) {
            this.posSubmitFormSucesso();
        }
        else {
            responseApi.erros.forEach(x => {
                this.showError(x);
            });
        }
    }

    protected submitFormDtoAux(resource): void {
        if (this.currentAction == 'new') {
            this.resourceService.createDTO(resource).subscribe(
                responseApi => {
                    this.tratarResponseSubimit(responseApi);
                }, err => {
                    this.tratarErro(err);
                }
            );
        }
        else {
            this.resourceService.updateDTO(resource).subscribe(
                responseApi => {
                    this.tratarResponseSubimit(responseApi);
                }, err => {
                    this.tratarErro(err);
                }
            );
        }
    }

    //OPICIONAIS
    protected posLoadResource(): void { }
    protected posNgOnInit(): void { }
    protected posNgAfterContentChecked(): void { }
    protected beforeSubmitForm(): void { }
    protected acceptOrRejectConfirmDialog(aceito: boolean): void { }


    //ABSTRACT
    protected abstract buildResourceForm(): void;
    protected abstract posSubmitFormSucesso(): void;
}
