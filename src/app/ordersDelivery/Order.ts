import { ArticleOrder } from './ArticleOrder';
import { Client } from './Client';

export interface Order {
    id: number;
    state: OrderState;
    client: Client;
    articles : ArticleOrder[];
 }

export enum OrderState {
    InDelivery = "En livraison",
    Terminate = "Terminer",
    Surplus = "Surplus"
}
