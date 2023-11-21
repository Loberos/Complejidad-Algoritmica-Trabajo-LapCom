import {Component, OnInit} from '@angular/core';
import {Laptop} from "../../model/laptop";
import {ActivatedRoute} from "@angular/router";
import {LaptopsService} from "../../services/laptops/laptops.service";
import { filter } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

interface FilterParams {
  brand: string;
  status: string;
  price: string;
  typeStorage: string;
  cpu: string;
  gpu: string;
  storage: string;
}



@Component({
  selector: 'app-laptop-details',
  templateUrl: './laptop-details.component.html',
  styleUrls: ['./laptop-details.component.css'],
})
export class LaptopDetailsComponent implements OnInit {
  laptop: Laptop | undefined;
  recommendations: any[] = [];
  myForm: FormGroup;

  brand = ['True', 'False'];
  status = ['True', 'False'];
  price = ['True', 'False'];
  typeStorage = ['True', 'False'];
  cpu = ['True', 'False'];
  gpu = ['True', 'False'];
  storage = ['True', 'False'];

  constructor(
    private route: ActivatedRoute,
    private laptopService: LaptopsService,
    private formBuilder: FormBuilder
  ) {
     this.myForm = this.formBuilder.group({
       typeStorage: [''],
       cpu: [''],
       gpu: [''],
       status: [''],
       price: [''],
       brand:['']
     });
  }

  ngOnInit(): void {
    this.getLaptopDetails();
    this.getRecommendations();
    // @ts-ignore
    const laptopId = +this.route.snapshot.paramMap.get('id');
  }

  getLaptopDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.laptopService.getLaptopById(id).subscribe((data) => {
      this.laptop = data;
    });
  }

  getRecommendations(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.laptopService.getRecommendationsById(id).subscribe((data) => {
      this.recommendations = data;
    });
  }

  filterLaptops() {
    // @ts-ignore
    const laptopId = +this.route.snapshot.paramMap.get('id');
    console.log(this.myForm.value);
     this.laptopService
       .filterLaptops(laptopId, this.myForm.value)
       .subscribe((data) => {
          this.recommendations = data;
       });
  }
}
