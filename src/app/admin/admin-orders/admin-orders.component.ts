import { Component, OnInit, TemplateRef } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrderService } from 'src/app/shared/services/order.service';
import { IProduct } from '../../shared/interfaces/product.interfaces';
import { ProductService } from 'src/app/shared/services/product.service';
import { Order } from '../../shared/models/order.model';
import { AngularFirestore } from '@angular/fire/firestore';


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
  orderStatus: string;
  detailName: string; //for modal aboutUser
  detailPhone: string; //for modal aboutUser
  detailCity: string; //for modal aboutUser
  detailStreet: string; //for modal aboutUser
  detailHouse: string; //for modal aboutUser
  detailComment: string; //for modal aboutUser

  editStatus: boolean;
  orderStatus1: boolean;
  orderStatus2: boolean;
  
  constructor(private orderService: OrderService,
    private modalService: BsModalService,
    private prodService: ProductService,
    private afStore: AngularFirestore
  ) {

  }

  ngOnInit(): void {
    this.getOrders();
    // this.adminJSONProduct();
    // this.getTotal()
  }

  // private getOrders(): void {
  //   this.orderService.getOrder().subscribe(data => {
  //     this.adminOrders = data;

  //   })
  // }

  private getOrders(): void {
    this.orderService.getFirecloudOrders().subscribe(collection => {
      this.adminOrders = collection.map(order => {
        const data = order.payload.doc.data() as IOrder;
        const id = order.payload.doc.id;
        return { id, ...data };
      });
    }
    );
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
    this.editStatus = false;
    this.orderStatus1 = false;
    this.orderStatus2 = false;

    this.getTotal();
  }

  changeOrderStatus(ordDetails: IOrder, status: boolean): void {
    status == true ? ordDetails.status = 'Прийнято' : ordDetails.status = 'Відхилено';
    this.orderStatus = ordDetails.status
    this.saveOrder()
    if (status == true) {
      this.orderStatus1 = true;
    }
    if (status == false) {
      this.orderStatus2 = true;
   }
  }

  completeOrder(order: IOrder): void {
    order.status = 'Завершено'
    this.orderStatus= order.status
  }

  deleteOrder(order: IOrder): void {
    // this.orderService.deleteOrder(order.id).subscribe(data => {
    //   this.getOrders()
    // })
    this.orderService.deleteFirecloudOrder(order.id);
    this.getOrders()
  }

  deleteProduct(product: IProduct): void {
    if (confirm('Are you sure')) {
      const index = this.orderProducts.findIndex(prod => prod.id === product.id);
      this.orderProducts.splice(index, 1);
      this.getTotal();
      this.orderService.basket.next('check');
      this.saveOrder()
    }
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

 private saveOrder() {
    this.editStatus= true;
    const order: IOrder = new Order(
      this.orderID,
      this.detailName,
      this.detailPhone,
      this.detailCity,
      this.detailStreet,
      this.detailHouse,
      this.orderProducts,
      this.totalPrice,
      new Date(),
      this.detailComment,
      this.orderStatus,);

      // this.orderService.updateOrder(product).subscribe(
      //   () => { this.getOrders(); }
      // );
    this.orderService.updateFirecloudOrder(Object.assign({}, order));
    this.modalService.hide(1)
    if (this.totalPrice == 0) {
      alert('Замовлення пусте і буде автоматично видалено!')
      this.deleteOrder(order)
      this.modalService.hide(1)
    }
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
