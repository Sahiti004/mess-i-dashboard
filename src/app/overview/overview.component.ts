import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { StudentdataService } from '../studentdata.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  @Output("UpdateNav") updateNav :EventEmitter<any> = new EventEmitter();

  messHistory:any;
  noOfDays:any;
  date = new Date();
  headers = ['Day','Breakfast','Lunch','Snacks','Dinner','Milk','Egg','Fruit']

  constructor(private service:StudentdataService,private auth:AuthService, private router:Router) {
    if(!this.auth.isLoggedIn()){
      this.router.navigate(['login'])
    }
   }

  ngOnInit(): void {
  }

  cleanData(history:any){
    let body = [];
    let foot = [0,0,0,0,0,0,0];
    for(let j=0;j<this.noOfDays.length;j++){
      if(!(this.noOfDays[j] in history)){
        body.push([this.noOfDays[j],'-','-','-','-','-','-','-'])
      }else{
        let day = [this.noOfDays[j]];
        for(let k=1;k<this.headers.length;k++){
          if(this.headers[k] in history[this.noOfDays[j]]){
            day.push(history[this.noOfDays[j]][this.headers[k]]);
            foot[k-1]+=history[this.noOfDays[j]][this.headers[k]];
          }else{
            day.push('-');
          }
        }
        body.push(day);
      }
    }
    let footer = ["Total"];
    for(let i=0;i<foot.length;i++){
      footer.push(foot[i].toString());
    }
    let res = {headers:this.headers,body:body,footer:footer}
    return res;
    
  }

  async getMonthMessData(data: any){
    
    if (data.form.value.year&&data.form.value.month) {
      let num =  new Date(parseInt(data.form.value.year), parseInt(data.form.value.month), 0).getDate();
      this.noOfDays = Array(num).fill(1).map((x, i) => (i + 1).toString());
      this.service.getMonthlyMessdata(data.form.value.hostel,data.form.value.year,data.form.value.month).then((res)=>
      {
        let history = res;
        // console.log(res);
        this.messHistory = this.cleanData(history);
        console.log(this.messHistory)
      }).catch((res)=>{
        console.log(res)
        this.messHistory = this.cleanData({})
      });
    }else{
    }
  }

}
