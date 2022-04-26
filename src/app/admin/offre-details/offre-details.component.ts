import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Offre } from 'src/app/services/offres';
import { OffresServiceService } from 'src/app/services/offres-service.service';

@Component({
  selector: 'app-offre-details',
  templateUrl: './offre-details.component.html',
  styleUrls: ['./offre-details.component.scss']
})
export class OffreDetailsComponent implements OnInit {

  public offre?: any;
  constructor(private route: ActivatedRoute, private router: Router,
    private offreService: OffresServiceService ) { }

  ngOnInit(): void {


  const offreid = this.route.snapshot.params.id;
    this.offreService.getOffres(offreid)
      .subscribe(offre => this.offre = offre);
  }
openForm() {
    document.getElementById("myForm").style.display = "block";
}

 closeForm() {
    document.getElementById("myForm").style.display = "none";
}
}
