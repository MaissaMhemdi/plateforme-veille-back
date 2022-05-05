import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Offre } from 'src/app/services/offres';
import { OffresServiceService } from 'src/app/services/offres-service.service';
import { productsDB } from '../../shared/data/products'; 
@Component({
  selector: 'll-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit {
  products = [];
  offres: Offre[] = [];
  pageSize : number = 10;
  pageElement : number =0;
  totalElement : number;

   constructor(private offresService: OffresServiceService,
               private router: Router,  private activatedRoute: ActivatedRoute) {}

   // tslint:disable-next-line:typedef
   ngOnInit() {
     this.getOffres();
     
   }
   detailsOffre(id: string) {
    this.router.navigate(['/dashadmin/detail', id]);
  }
   private getOffres() {
    this.offresService.getOffresListNotArchives(this.pageSize,this.pageElement)
    .subscribe(data => {
        this.offres = data['offres'];
        this.totalElement = data.totalElements;
        console.log("yyyyyyyyyyyyyyyyyyyy\n",this.totalElement)
    }
    , error => {
        console.log(error.error.message);
    }
    );
}
nextPage(event) {
 this.pageSize=event.pageSize
 this.pageElement=event.pageIndex.toString();

  this.getOffres();
  console.log("hhhhhhhhhh",this.getOffres())
}
}