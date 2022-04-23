import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Offre } from 'src/app/services/offres';
import { OffresServiceService } from 'src/app/services/offres-service.service';
import { productsDB } from 'src/app/shared/data/products';

@Component({
  selector: 'app-offres-archives',
  templateUrl: './offres-archives.component.html',
  styleUrls: ['./offres-archives.component.scss']
})
export class OffresArchivesComponent implements OnInit {

  view = 'list';

  offres: Offre[] = [];
  pageSize : number = 10;
  pageElement : number =0;
  totalElement : number;

   constructor(private offresService: OffresServiceService,
     private router: Router,  private activatedRoute: ActivatedRoute) {}

   // tslint:disable-next-line:typedef
   ngOnInit() {
     this.getOffresarchives();
     
   }

   private getOffresarchives() {
    this.offresService.getOffresListArchives(this.pageSize,this.pageElement)
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

  this.getOffresarchives();
  console.log("hhhhhhhhhh",this.getOffresarchives())
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




