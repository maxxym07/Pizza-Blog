import { IOrder } from '../interfaces/order.interface';
import { IProduct } from '../interfaces/product.interfaces';
export class Order implements IOrder {
    constructor(public id: number,
        public userName: string,
        public userPhone: string,
        public userCity: string,
        public userStreet: string,
        public userHouse: string,
        public ordersDetails: Array<IProduct>,
        public totalPayment: number,
        public dateOrder: any,
        public userComment: string,
        public status: string = 'В обробці',
    ) { }
}