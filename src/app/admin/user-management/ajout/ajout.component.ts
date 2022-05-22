import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/dashboard/service/user.service';
import { User } from '../user-management.model';

@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.scss']
})
export class AjoutComponent implements OnInit {
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
  langKey: [],
  authorities: [],
});

constructor(private userService: UserService , private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
  }
  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
      this.userService.create(this.user).subscribe({
        next: () => this.onSaveSuccess(),
        error: () => this.onSaveError(),
      });
    }

    private onSaveSuccess(): void {
      this.isSaving = false;
      this.previousState();
    }
  
    private onSaveError(): void {
      this.isSaving = false;
    }
  
}

   




