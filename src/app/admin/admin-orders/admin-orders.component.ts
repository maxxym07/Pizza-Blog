import { Component, OnInit, TemplateRef } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrderService } from 'src/app/shared/services/order.service';
import { IProduct } from '../../shared/interfaces/product.interfaces';
import { ProductService } from 'src/app/shared/services/product.service';
import { Order } from '../../shared/models/order.model';


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  modalRef: BsModalRef;
  //for sort
  reverse: boolean = true;
  order: string = 'dateOrder';
  //for sort

  totalPrice = 0;

  adminOrders: Array<IOrder> = [];// for table adminOrder
  ordDetails: IOrder;

  orderProducts: Array<IProduct> = [];
  orders: Array<IProduct> = [];

  inputS: string;//for search Pipe


  orderID = 1;
  detailName: string; //for modal aboutUser
  detailPhone: string; //for modal aboutUser
  detailCity: string; //for modal aboutUser
  detailStreet: string; //for modal aboutUser
  detailHouse: string; //for modal aboutUser
  detailComment: string; //for modal aboutUser

  editStatus: boolean;

  constructor(private orderService: OrderService,
    private modalService: BsModalService,
    private prodService: ProductService
  ) {

  }

  ngOnInit(): void {
    this.getOrders();
    this.adminJSONProduct();
    this.getTotal()
  }

  private getOrders(): void {
    this.orderService.getOrder().subscribe(data => {
      this.adminOrders = data;

    })
  }

    private adminJSONProduct(): void {
      this.prodService.getJSONProduct().subscribe(data => {
        this.orderProducts = data;
      });
    }

  
  openDetailsModal(order: IOrder, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      { class: 'modal-dialog-centered modal-order' });
      this.orderID = order.id;
    this.ordDetails = order;
    this.detailName = this.ordDetails.userName
    this.detailPhone = this.ordDetails.userPhone
    this.detailCity = this.ordDetails.userCity
    this.detailStreet = this.ordDetails.userStreet
    this.detailHouse = this.ordDetails.userHouse
    this.detailComment = this.ordDetails.userComment
    this.orderProducts = order.ordersDetails
    this.editStatus= false;

    this.getTotal();
  }

  changeOrderStatus(ordDetails: IOrder, status: boolean): void {
    status == true ? ordDetails.status = 'Прийнято' : ordDetails.status = 'Відхилено';
    this.modalService.hide(1);
  }

  completeOrder(order: IOrder): void {
    order.status = 'Завершено'
  }

  deleteOrder(order: IOrder): void {
    this.orderService.deleteOrder(order.id).subscribe(data => {
      this.getOrders()
    })
  }

  productCount(product: IProduct, status: boolean): void {
    this.prodService.productCountService(product, status)
    this.orderService.basket.next('check');
    this.getTotal();

  }

  // сумування вартості товарів
  private getTotal(): void {
    this.totalPrice = this.orderProducts.reduce((total, prod) => {
      return total + (prod.price * prod.count);
    }, 0);
  }
  // 


  deleteProduct(product: IProduct): void {
    if (confirm('Are you sure')) {
      const index = this.orderProducts.findIndex(prod => prod.id === product.id);
      this.orderProducts.splice(index, 1);
      this.getTotal();
      this.orderService.basket.next('check');
    }
  }


  saveOrder() {
    this.editStatus= true;
    const product: IOrder = new Order(
      this.orderID,
      this.detailName,
      this.detailPhone,
      this.detailCity,
      this.detailStreet,
      this.detailHouse,
      this.orderProducts,
      this.totalPrice,
      new Date(),
      this.detailComment);

      this.orderService.updateOrder(product).subscribe(
        () => { this.getOrders(); }
      );
  }



  //for sort
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
  //for sort
}
