import { Order } from './Order';

export interface Delivery {
    id: number;
    user: string;
    state: DeliveryState;
    title: string;
    orders : Order[];
}

export enum DeliveryState {
    Preparation = "En préparation",
    Delivery = "En livraison",
    Finished = "Finie",
    Default = "Defaut"
}
