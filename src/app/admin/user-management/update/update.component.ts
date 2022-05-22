import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/dashboard/service/user.service';
import { User } from '../user-management.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  user!: User;
  authorities: string[] = [];
  isSaving = false;
 login:string;
 editForm = this.fb.group({
  id: [],
  login: [
    '',
    [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
    ],
  ],
  firstName: ['', [Validators.maxLength(50)]],
  lastName: ['', [Validators.maxLength(50)]],
  email: ['', [Validators.minLength(5), Validators.maxLength(254), Validators.email]],
  activated: [],
  authorities: [],
});


  constructor(private userService: UserService , private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.user = new User();

    this.login = this.route.snapshot.params.login;
    this.userService.find(this.login)
      .subscribe(data => {
        console.log(data),
        this.user = data;
      
      }, error => console.log(error));

      this.route.data.subscribe(({ user }) => {
        if (user) {
          this.user = user;
          if (this.user.id === undefined) {
            this.user.activated = true;
          }
          this.updateForm(user);
        }
      });
      this.userService.authorities().subscribe(authorities => (this.authorities = authorities));

  }

    // tslint:disable-next-line:typedef
   // updateProjet() {
    //  this.userService.update(this.user)
    //    .subscribe(data => console.log(data), error => console.log(error));
    //  this.user = new User();
   // }
 

   previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    this.updateUser(this.user);
    if (this.user.login !== undefined) {
      this.userService.update(this.user).subscribe({
        next: () => this.onSaveSuccess(),
        error: () => this.onSaveError(),
      });
    }  else {
      this.userService.create(this.user).subscribe({
        next: () => this.onSaveSuccess(),
        error: () => this.onSaveError(),
      });
    }
  }

  private updateForm(user: User): void {
    this.editForm.patchValue({
      id: user.id,
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      activated: user.activated,
      authorities: user.authorities,
    });
  }

  private updateUser(user: User): void {
    user.login = this.editForm.get(['login'])!.value;
    user.firstName = this.editForm.get(['firstName'])!.value;
    user.lastName = this.editForm.get(['lastName'])!.value;
    user.email = this.editForm.get(['email'])!.value;
    user.activated = this.editForm.get(['activated'])!.value;
    user.authorities = this.editForm.get(['authorities'])!.value;
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError(): void {
    this.isSaving = false;
  }
}

