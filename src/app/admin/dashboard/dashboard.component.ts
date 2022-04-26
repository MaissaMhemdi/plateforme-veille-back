import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Offre} from 'src/app/services/offres';
import { OffresServiceService } from 'src/app/services/offres-service.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
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
  
   // tslint:disable-next-line:typedef


   deleteOffres(id: string) {
     this.offresService.deleteOffre(id)
       .subscribe(
         data => {
           console.log(data);
           window.location.reload();

         },
         error => console.log(error));
   }


   getArchived(id: string) {
    this.offresService.getArchived(id)
       .subscribe(
         data => {
           console.log(data);
           window.location.reload();
         },
         error => console.log(error));

 }
  
    // tslint:disable-next-line:typedef
}

