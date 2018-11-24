import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  fg: FormGroup;
  gridData = [];
  filteredData = [];
  // gridHeaders = ['branch', 'address', 'bank_id', 'bank_name', 'city', 'district', 'ifsc', 'state'];
  gridHeaders = ['Id', 'Branch', 'Name', 'City', 'District', 'State', 'Address', 'IFSC'];
  constructor(private fb: FormBuilder,
    private apiService: ApiService) { }

  ngOnInit() {
    this.fg = this.fb.group({
      'city': [],
      'search': ['']
    });

    this.fg.controls['city'].valueChanges.subscribe(() => {
      const selectedCity = this.fg.controls['city'].value;
      this.fg.controls['search'].setValue('');
      this.gridData = [];
      this.filteredData = [];
      // make api call to fetch data
      this.apiService.getGridData$(selectedCity).subscribe(data => {
        this.gridData = data.map(rawDatum => ({
          Id: rawDatum.bank_id,
          Branch: rawDatum.branch,
          Address: rawDatum.address,
          Name: rawDatum.bank_name,
          City: rawDatum.city,
          District: rawDatum.district,
          State: rawDatum.state,
          IFSC: rawDatum.ifsc
        }));
        this.filteredData = this.gridData;
      });


    });


    this.fg.controls['search'].valueChanges.subscribe(() => {
      const searchParam = this.fg.controls['search'].value;
      this.filteredData = this.gridData.filter(data => this.searchCondition(data, searchParam));
    });
  }

  searchCondition(data, searchParam) {
    const keys = Object.keys(data);
    let condition = false;
    for (const key of keys) {
      condition = condition || String(data[key]).includes(searchParam);
    }
    return condition;
  }
}
