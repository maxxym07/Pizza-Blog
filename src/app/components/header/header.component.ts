import { Component, OnInit, TemplateRef } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interfaces';
import { OrderService } from 'src/app/shared/services/order.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private basket: Array<IProduct> = [];
  totalPrice = 0;

  loginForm: FormGroup;
  modalRef: BsModalRef;

  userEmail: string;
  userPassword: string;

  switch: boolean;
  firstName: string
  lastName: string

  statusLogin: boolean;
  urlName: string;
  menuName: string;

  checkName = /[А-Яа-я]{2,20}/;
  checkEmail = /^[\w\.\-]{1,}@\w{1,}\.\w{2,7}$/;
  checkPassword: RegExp = /^[0-9A-Za-z]{8,}$/;

  constructor(private ordService: OrderService,
    private authService: AuthService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.checkBasket();
    this.getLocalStorage()
    this.checkUser();
    this. updateCheckUser()
  }

  private checkBasket(): void {
    this.ordService.basket.subscribe(
      () => {
        this.getLocalStorage();
      }
    );
  }

  loginModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' });
  }


  private getLocalStorage(): void {
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      this.basket = JSON.parse(localStorage.getItem('myOrder'));
      this.totalPrice = this.basket.reduce((total, prod) => {
        return total + (prod.price * prod.count)
      }, 0);
    }
    else {
      this.totalPrice = 0;
    }
  }

  registerUser(): void {
    if (this.checkName.test(this.firstName)) {
      if (this.checkName.test(this.lastName)) {
        if (this.checkEmail.test(this.userEmail)) {
          if (this.checkPassword.test(this.userPassword)) {
            this.authService.signUp(this.userEmail, this.userPassword, this.firstName, this.lastName);
            this.modalService.hide(1)
            this.userEmail = '';
            this.userPassword = '';
            this.firstName = '';
            this.lastName = '';
            this.switch = !this.switch;
          }
          else{
            alert('Пароль має бути від 8 символів')
          }
        }
        else {
          alert('Заповніть коректно поле "Email"')
        }
      }
      else {
        alert('Заповніть коректно поле "Прізвище"')
      }
    }
    else {
      alert('Заповніть коректно поле "Імя"')
    }
  }



  switchForm(): void {
    this.switch = !this.switch;
  }
  loginUser(): void {
    this.authService.signIn(this.userEmail, this.userPassword);
    this.modalService.hide(1)
    this.userEmail = '';
    this.userPassword = '';
  }

  private updateCheckUser(): void {
    this.authService.userStatusChanges.subscribe(
      () => {
        this.checkUser()
      }
    )
  }


  private checkUser(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      if (user.role === 'admin') {
        this.urlName = 'admin';
        this.menuName = 'адмін';
        this.statusLogin = true;

      }
      else if (user.role === 'user') {
        this.urlName = 'profile';
        this.menuName = 'Кабінет';
        this.statusLogin = true;
      }

    }
    else {
      this.statusLogin = false;
      this.urlName = '';
      this.menuName = '';
    }
  }

}
