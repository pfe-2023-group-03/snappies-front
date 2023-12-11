import { Component, OnInit } from '@angular/core';
import { ordersDeliveryService } from './ordersDelivery.service';
import { NavigationService } from '../services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CompositionDialogComponent } from './compositiondialog/compositiondialog.component';

@Component({
  selector: 'app-tour',
  templateUrl: './ordersDelivery.component.html',
  styleUrls: ['./ordersDelivery.component.css'],
})
export class ordersDeliveryComponent implements OnInit {

  delivery: any;
  orders: any[] = [];
  clientDetails: any = {};
  deliveryBoxes: number = 0;
  Articles: any[] = [];
  articleQuantityMap: Map<string, number> = new Map();


  constructor(
    private ordersdeliveryService: ordersDeliveryService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    public dialog: MatDialog 
  ) {}

  ngOnInit(): void {
    this.getDeliveryAndOrders();
  }

  navigateTo(route: string): void {
    this.navigationService.navigateTo(route);
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
  
        // Récupérer les détails du client pour chaque commande
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

  openCompositionDialog() {
    const dialogRef = this.dialog.open(CompositionDialogComponent, {
      width: '400px',
    });
  }

  getArticles(): void {
    const articles = this.ordersdeliveryService.getArticles()
    articles.forEach(article => {
      this.Articles.push(article)
    });
  };

  calculateForEachBoxesQuantity(): void {
    this.orders.forEach(order => {
      const articlesInOrder = order.articles;

      this.Articles.forEach(article => {
        const articleIdString = article.id.toString();

        if (this.articleQuantityMap.has(articleIdString)) {
          this.articleQuantityMap.set(articleIdString, this.articleQuantityMap.get(articleIdString)! + 1);
        } else {
          this.articleQuantityMap.set(articleIdString, 1);
        }
      });
    });

    console.log('Article Quantity Map:', this.articleQuantityMap);
  }


}
