import { Component, OnInit } from '@angular/core';
import { Chart,registerables } from 'node_modules/chart.js'
import { FormControl,FormBuilder, Validators  } from '@angular/forms'
Chart.register(...registerables)

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit{
  public chart : any;
  inputForm : any;
  chartdata : any[] =[];
  constructor(private fb : FormBuilder){}

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      inputOne : this.fb.control('',[Validators.required, Validators.max(100)]),
      inputTwo : this.fb.control('',[Validators.required, Validators.max(100)])
    })
  }

  

  onSubmit(){
    let newInputVal : any = (100 - Number(this.inputForm.controls.inputOne.value));
    this.inputForm.controls.inputTwo.setValue(newInputVal);
    this.chartdata.push(this.inputForm.controls.inputOne.value, this.inputForm.controls.inputTwo.value);
    this.createChart(); 
  }

  onClickClear(){
    this.inputForm.reset();
    this.chartdata = [];
    window.location.reload();
  }

  createChart(){
    this.chart = new Chart('myChart',{
      type : 'pie',
      data : {
        labels : ['value 1', 'value 2'],
      datasets : [
        {
          label : "Pie Chart",
          data : this.chartdata,
          backgroundColor : ['#000', 'yellow']
        }
      ]
      },
      options : {
        aspectRatio : 2.5
      }
    });
  }


 
}
