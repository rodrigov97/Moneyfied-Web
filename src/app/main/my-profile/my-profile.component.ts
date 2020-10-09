import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'src/app/core/services/custom-validators';
import { DataService } from 'src/app/shared/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProfileService } from './profile.service';
import { ResponsiveService } from 'src/app/core/services/responsive.service';
import { Usuario } from 'src/app/core/models/usuario.model';
import { FilesHandlerService } from 'src/app/core/services/files-handler.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  formTitle: string = 'Dados do usuário';
  formProfile: FormGroup;
  formDisabled: boolean = true;

  isLoading: boolean = false;

  isMobile: boolean;

  isPasswordHidden: boolean;
  passwordInput: string = 'password';

  userName: string = '';
  userProfilePicture: string = '';

  constructor(
    private responsiveService: ResponsiveService,
    private localStorage: LocalStorageService,
    private profileService: ProfileService,
    private dataService: DataService,
    private filesHandler: FilesHandlerService
  ) {
    this.formProfile = new FormGroup({
      Nome: new FormControl('', [
        Validators.required
      ]),
      Email: new FormControl('', [
        Validators.required, CustomValidators.email
      ]),
      Senha: new FormControl('', [
        Validators.required, Validators.minLength(5)
      ])
    });
  }

  get name(): any {
    return this.formProfile.get('Nome');
  }

  get email(): any {
    return this.formProfile.get('Email');
  }

  get password(): any {
    return this.formProfile.get('Senha');
  }

  ngOnInit(): void {
    this.formState();
    this.onResize();
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.isLoading = true;
    const usuarioId = this.localStorage.userId

    this.profileService.getUserInfo(usuarioId).subscribe(
      response => {
        if (response.success) {
          const user = response.usuario;

          this.formProfile.setValue({
            Nome: user.Nome,
            Email: user.Email,
            Senha: user.Senha
          });

          this.isLoading = false;
          this.userName = user.Nome;
          this.userProfilePicture = user.ImagemPerfil;
        }
      });
  }

  onResize(): void {
    this.responsiveService.checkWidth();
    this.isMobile = this.responsiveService.isMobile;
  }

  formState(): void {
    if (this.formDisabled) {
      this.passwordInput = 'password';
      this.formProfile.disable();
      this.formTitle = 'Dados do usuário';
    }
    else {
      this.formProfile.enable();
      this.formTitle = 'Editar dados do usuário';
    }
  }

  changeFormState(): void {
    this.formDisabled = !this.formDisabled;
    this.formState();
  }

  showPasswordEvent() {
    this.isPasswordHidden = !this.isPasswordHidden;

    this.passwordInput = this.isPasswordHidden ? 'text' : 'password';
  }

  cancelEditing(): void {
    this.formDisabled = !this.formDisabled;
    this.formProfile.reset();
    this.loadUserInfo();
  }

  updateUserInfo(): void {
    const isValid = this.formProfile.valid;

    if (isValid) {
      const user = new Usuario(this.formProfile.value);
      user.UsuarioId = this.localStorage.userId;

      this.isLoading = true;

      this.profileService.updateUserInfo(user).subscribe(
        response => {

          if (response.success) {
            this.isLoading = false;

            this.dataService.openSuccessDialogModal({
              command: 'open',
              title: 'Sucesso',
              content: response.message
            });

            this.userName = user.Nome;
            this.formDisabled = true;
            this.formState();
          }
          else {
            this.isLoading = false;

            this.dataService.openWarningDialogModal({
              command: 'open',
              title: 'Atenção',
              content: response.message
            });
          }
        });
    }
  }

  changeProfileImage(): void {
    document.getElementById('profile-pic-input').click();
  }

  changeImageHandler(event: any): void {
    var file = event.target.files[0],
      userId = this.localStorage.userId;

    file = this.filesHandler.generateUserProfileImage(file);

    this.isLoading = true;

    this.profileService.uploadProfilePicture(file, userId).subscribe(
      response => {
        if (response.success) {
          this.loadUserInfo();

          this.dataService.openSuccessDialogModal({
            command: 'open',
            title: 'Sucesso',
            content: response.message
          });
        }
        else {
          this.isLoading = false;

          this.dataService.openErrorDialogModal({
            command: 'open',
            title: 'Erro',
            content: response.message
          });
        }
      });
  }
}
