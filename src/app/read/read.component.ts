import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private service: ApiserviceService) { }

  readData: any;
  successmsg : any;
  ngOnInit(): void {
    this.service.getAllData().subscribe((res) => {
      console.log(res, "ress==>");
      this.readData = res.data
    });
  }


  //deleteid
  deleteId(id: any) {
    console.log(id, 'deleteid==>')
    this.service.deleteData(id).subscribe((res) => {
      console.log(res, "delete==>");
      this.successmsg = res.messeges;
      window.location.reload();
    })};
  

}