import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-page-connect',
  templateUrl: './page-connect.component.html',
  styleUrls: ['./page-connect.component.css']
})
export class PageConnectComponent {
  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  submit() {
  const user: User = this.loginForm.value;
  this.userService.loginUser(user).subscribe((res) => {
    console.log("Login effectué");
    console.log(res);

    // Assumer que la réponse contient un champ "token"
    const token = res.data;

    // Stocker le token dans le localStorage
    localStorage.setItem('token', token);
    console.log(res.data);

    const storedToken = localStorage.getItem('token');
    console.log(storedToken);

    // Réinitialiser le formulaire
    this.loginForm.reset();
 
    // Afficher la modal
    const modalElement = document.getElementById('loginModal');
const modalInstance = new bootstrap.Modal(modalElement!);
modalInstance.show();

  
  });
}

}
