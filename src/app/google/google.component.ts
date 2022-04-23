import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Offre } from '../services/offres';
import { OffresServiceService } from '../services/offres-service.service';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})
export class GoogleComponent implements OnInit {
  text: string;
  offres: Offre[] = [];


  constructor(private  service: OffresServiceService, private router: Router) { }

  ngOnInit(): void {
this.onSubmit();
  }
  onSubmit(): void {
    this.service.getOffresGoogle(this.text).subscribe(
      data => {
       console.log(data);
       
      } ,

    ); }
}
