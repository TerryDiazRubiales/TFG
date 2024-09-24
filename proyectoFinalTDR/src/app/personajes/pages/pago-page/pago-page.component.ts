import { Component, OnInit } from "@angular/core";
import { ICreateOrderRequest } from "ngx-paypal";

import { pjServices } from '../../services/pj.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-page',
  templateUrl: './pago-page.component.html',
  styleUrls: ['./pago-page.component.css']
})
export class PagoPageComponent {

  public payPalConfig: any;
  public showPaypalButtons: boolean = true;

  constructor(
    private pjServices : pjServices,
    private router: Router,
  ) {}
 
  ngOnInit() {
    this.payPalConfig = {
      currency: "EUR",
      clientId: "AY5d4e8NoHyqIM7rFM_4OleytY88UJnDLB80bRn4i3eY-gomhni7yD8L-JbsEo87BvCn7zCdjiNpU8pp",
      createOrder: (data:any) =>
        <ICreateOrderRequest>{
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "EUR",
                value: "9.99",
                breakdown: {
                  item_total: {
                    currency_code: "EUR",
                    value: "9.99"
                  }
                }
              },
              items: [
                {
                  name: "Enterprise Subscription",
                  quantity: "1",
                  category: "DIGITAL_GOODS",
                  unit_amount: {
                    currency_code: "EUR",
                    value: "9.99"
                  }
                }
              ]
            }
          ]
        },
      advanced: {
        commit: "true",
        extraQueryParams: [ { name: "disable-funding", value:"credit,card"} ]
      },
      style: {
        label: "paypal",
        layout: "vertical"
      },
      onApprove: (data:any, actions:any) => {
        console.log(
          "onApprove - transaction was approved, but not authorized",
          data,
          actions
        );

        // AQUI SE PONE AL USUARIO COMO VIP Y SE REDIRECCIONA AL RANKING
        this.pjServices.setVip().subscribe ( res => {
          this.router.navigate(['/personajes/ranking'])
        })


        actions.order.get().then((details:string) => {
          console.log(
            "onApprove - you can get full order details inside onApprove: ",
            details
          );
        });
      },
      onClientAuthorization: (data:any) => {
        console.log(
          "onClientAuthorization - you should probably inform your server about completed transaction at this point",
          data
        );
      },
      onCancel: (data:any, actions:any) => {
        console.log("OnCancel", data, actions);
      },
      onError: (err:any) => {
        console.log("OnError", err);
      },
      onClick: (data:any, actions:any) => {
        console.log("onClick", data, actions);
      }
    };
  }
 
  pay() {
    this.showPaypalButtons = true;
  }
 
  back(){
    this.showPaypalButtons = false;
  }
}
