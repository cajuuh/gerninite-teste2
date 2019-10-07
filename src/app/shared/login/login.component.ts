import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthSocialLink, NbAuthService } from '@nebular/auth';
import { Pessoa } from '../../models/Pessoa';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { ResponseLogin } from '../../@core/utils/login.response';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  public dataSource: any;
  public username: string;
  public password: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService) {
  }

  ngOnInit() {
    this.dataSource = this.fb.group({
      nome: this.fb.control('', [Validators.required]),
      senha: this.fb.control('', [Validators.required])
    });
  }

  login() {
    this.loginService.login(this.dataSource.value)
      .subscribe((response: ResponseLogin) => {
        if (response) {
          this.loginService.setStorge('token', 'Bearer ' + response.token);
          this.loginService.setStorge('usuario', this.dataSource.value.nome);
          this.router.navigate(['pages']);
        }
      },
        (err: HttpErrorResponse) => {
          this.loginService.setStorge('token', null);
          this.loginService.setStorge('usuario', null);
        });
  }
}
