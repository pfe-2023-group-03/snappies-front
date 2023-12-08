import { Client } from './Client';

export interface Order {
    id: number;
    state: OrderState;
    client: Client;
    delivery: string;
 }

export enum OrderState {
    InDelivery = "En livraison",
    Terminate = "Terminer",
    Surplus = "Surplus"
}
