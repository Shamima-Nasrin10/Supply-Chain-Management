import {Component, OnInit} from '@angular/core';
import {NotifyUtil} from "../../../util/notify.util";
import {SalesDetails} from "../model/salesdetails.model";
import {SalesDetailsService} from "../sales-details.service";
import {ApiResponse} from "../../../util/api.response";

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrl: './sales-details.component.css'
})
export class SalesDetailsComponent implements OnInit{

  salesDetails: SalesDetails[]=[];
  groupedSalesDetails: Map<number, SalesDetails[]> = new Map();


  constructor(private salesDetailsService: SalesDetailsService) {}

  ngOnInit(): void {
    this.loadSalesDetails();
    this.loadGroupedSalesDetails();
  }

  public loadSalesDetails(): void {
    this.salesDetailsService.getAllSalesDetails().subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.salesDetails = response.data['salesDetails'];
          console.log(this.salesDetails+"***********************************")
          if (this.salesDetails === null || this.salesDetails.length === 0) {
            NotifyUtil.error('No sales details found');
          }
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        console.error('Error loading sales details:', error);
        NotifyUtil.error(error);
      }
    });
  }


  // public loadSalesDetails(){
  //   this.salesDetailsService.getAllSalesDetails().subscribe({
  //     next:res=>{
  //       this.salesDetails=res;
  //       console.log(this.salesDetails+"*******************************");
  //     },
  //     error: err => {
  //       console.error('Error loading sales details:', err);
  //     }
  //
  //   });
  // }

  public loadGroupedSalesDetails(): void {
    this.salesDetailsService.getSalesDetailsGrouped().subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          // Convert Record<number, SalesDetails[]> to Map<number, SalesDetails[]>
          const groupedSalesObject = response.data['groupedSalesDetails'] as Record<number, SalesDetails[]>;
          this.groupedSalesDetails = new Map<number, SalesDetails[]>(
            Object.entries(groupedSalesObject).map(([key, value]) => [Number(key), value])
          );
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }


  protected readonly Object = Object;
}
