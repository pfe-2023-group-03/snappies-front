import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ordersDeliveryService } from './ordersDelivery.service';
import { NavigationService } from '../services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-tour',
  templateUrl: './ordersDelivery.component.html',
  styleUrls: ['./ordersDelivery.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ordersDeliveryComponent implements OnInit {

  delivery: any;
  orders: any[] = [];
  clientDetails: any = {};
  deliveryBoxes: number = 0;
  Articles: any[] = [];
  surplusQuantityDeliveries: any[] = [];
  articleQuantityMap: Map<string, number> = new Map();
  articleSurplusQuantityMap: Map<string, number> = new Map();

  constructor(
    private ordersdeliveryService: ordersDeliveryService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.getSurplusQuantity();
  }

  ngAfterViewInit(): void {
    this.calculateForEachBoxesQuantity();
    this.cdr.detectChanges();
  }

  navigateTo(route: string): void {
    this.navigationService.navigateTo(route);
  }

  getDeliverer(userId: number): void {
    this.ordersdeliveryService.getDeliverer(userId).subscribe(
      (deliverer) => {
        this.delivery.user = deliverer;
      },
      (error) => {
        console.error('Error loading deliverer', error);
      }
    );
  }

  getDeliveryAndOrders(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const deliveryId = this.getDeliveryId();
        return this.ordersdeliveryService.getDeliveryAndOrders(Number(deliveryId || ''));
      })
    ).subscribe(
      (data) => {
        this.delivery = data.delivery;
        this.orders = data.orders;
  
        this.orders.forEach(order => {
          const clientId = order.clientId;
          this.ordersdeliveryService.getClientOfOrder(clientId).subscribe(
            (client) => {
              this.clientDetails[order.id] = client;
            },
            (error) => {
              console.error('Error loading client of order', error);
            }
          );
        });
        this.getDeliveryBoxes();
        this.getDeliverer(this.delivery.userId);
        this.calculateForEachBoxesQuantity();
      },
      (error) => {
        console.error('Error loading delivery and orders', error);
      }
    );
  }
  

  getDeliveryId(): number {
    let id: number = 0;
    this.route.paramMap.subscribe(params => {
      const idFromUrl = params.get('deliveryId');
      id = idFromUrl ? +idFromUrl : 0;
    });

    return id;
  }

  encodeGoogleMapsAddress(address: string): string {
    return encodeURIComponent(address);
  }

  getDeliveryBoxes(): void {
    this.orders.forEach(order => {
      this.ordersdeliveryService.getDeliveryBoxes(order.id).subscribe(
        (boxes) => {
          this.deliveryBoxes += Number(boxes.sum);
        },
        (error) => {
          console.error('Error loading delivery boxes', error);
        }
      );
    });
  }

  getOrders(orders : any[]): any[] {
    return this.ordersdeliveryService.getOrders(orders);
  }
  

  calculateForEachBoxesQuantity(): void {
    this.orders.forEach(order => {
      const orderId = order.id;
  
      this.ordersdeliveryService.getOrderDetails(orderId).subscribe(
        (orderDetails) => {
          orderDetails.forEach(detail => {
            const articleId = detail.articleId;
            const quantity = detail.quantity;
  
            this.ordersdeliveryService.getArticle(articleId).subscribe(
              (article) => {
                const articleLabel = article.label;

                if (this.articleQuantityMap.has(articleLabel)) {
                  this.articleQuantityMap.set(articleLabel, this.articleQuantityMap.get(articleLabel)! + quantity);
                } else {
                  this.articleQuantityMap.set(articleLabel, quantity);
                }

                this.cdr.markForCheck();
              },
              (error) => {
                console.error('Error loading article', error);
              }
            );
          });
        },
        (error) => {
          console.error('Error loading order details', error);
        }
      );
    });

    this.surplusQuantityDeliveries.forEach( surplus => {
      const surplusQuantity = surplus.quantity - surplus.surplusQuantity;
      const articleId = surplus.articleId;
      let articleLabel = '';
      this.ordersdeliveryService.getArticle(articleId).subscribe(
        (article) => {
          articleLabel = article.label;
          if(this.articleSurplusQuantityMap.has(articleLabel)) {
            this.articleSurplusQuantityMap.set(articleLabel, this.articleSurplusQuantityMap.get(articleLabel)! + surplusQuantity);
          }else{
            this.articleSurplusQuantityMap.set(articleLabel, surplusQuantity);
          }
        },
        (error) => {
          console.error('Error loading article', error);
        }
      ); 
    });
  }


  async getSurplusQuantity() {
    const id = this.route.snapshot.paramMap.get('deliveryId');
    const deliveryId = Number(id);

    if(deliveryId !== null) {
      this.ordersdeliveryService.getSurplus(deliveryId).subscribe( 
        (surplus) => {
          surplus.forEach( (s: any) => {
            this.surplusQuantityDeliveries.push(s);
          }
          );
        },
        (error) => {
          console.error('Error loading surplus', error);
        }
      );
    }
    await this.getDeliveryAndOrders();
  }

  calculateTotalSurplus(): number {
    let totalSurplus = 0;
  
    this.articleSurplusQuantityMap.forEach((surplusQuantity) => {
      totalSurplus += surplusQuantity;
      
    });
  
    return totalSurplus;
  }

  updateDeliveryStatus(state: string): void {
    const deliveryId = this.delivery.id;
    if (deliveryId !== null) {
      this.ordersdeliveryService.updateDeliveryStatus(Number(deliveryId), state).subscribe(
        () => {
          this.delivery.state = state;
          this.cdr.markForCheck();
        },
        (error) => {
          console.error('Error updating delivery status', error);
        }
      );
    } else {
      console.error('Delivery ID is null');
    }
  }

}
