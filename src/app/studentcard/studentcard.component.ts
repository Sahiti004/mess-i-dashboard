import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../interfaces';
import { StudentdataService } from '../studentdata.service';

@Component({
  selector: 'app-studentcard',
  templateUrl: './studentcard.component.html',
  styleUrls: ['./studentcard.component.css']
})
export class StudentcardComponent implements OnInit {
  rollNumber: any;
  student : any;
  student_data : any;
  mess_data:any;
  noOfDays:any;
  date = new Date();
  headers = ['Day','Breakfast','Lunch','Snacks','Dinner','Milk','Egg','Fruit']

  constructor(private route: ActivatedRoute, private service: StudentdataService) {
   }

  ngOnInit(): void {
    this.rollNumber = this.route.snapshot.queryParams['rollNum'];
    this.fetch_student(this.rollNumber) 
  }

  async fetch_student(rollNum: any){
    if(this.service.studentCache.has(rollNum)){
      this.student = this.service.studentCache.get(this.rollNumber);
    }

    else{
      //make an api call if data not present in the this.studentCache    
      this.service.getStudentData(this.rollNumber).then((res)=>{
        this.student_data = res;
        var temp_student = {
        id: this.student_data.roll,
        name: this.student_data.name,
        hostel: this.student_data.hostel,
        room: this.student_data.room,
        card_status: this.student_data.allowed
      } as Student;
      console.log(temp_student)

      this.service.put_student_in_cache(temp_student);     
      this.student = this.service.studentCache.get(this.rollNumber);

    }).catch((res)=>{
      console.log(res)
    })
    }
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
            foot[k-1]+=1;  
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
    console.log(res);
    return res;
    
  }

  async getMonthData(data:any){
    if (data.form.value.year&&data.form.value.month) {
      let num =  new Date(parseInt(data.form.value.year), parseInt(data.form.value.month), 0).getDate();
      this.noOfDays = Array(num).fill(1).map((x, i) => (i + 1).toString());
      this.service.getMonthlydata(this.rollNumber,data.form.value.year,data.form.value.month).then((res)=>
      {
        let history = res;
        this.mess_data = this.cleanData(history);
        console.log(this.mess_data)
      }).catch((res)=>{
        console.log(res)
        this.mess_data = this.cleanData({})
      });
    }
  }


}
