import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service: ApiserviceService, private router: ActivatedRoute) { }

  errormsg: any
  successmsg: any
  getparamid: any;

  ngOnInit(): void {

    this.getparamid = this.router.snapshot.paramMap.get('id')
    console.log(this.getparamid)
    this.service.getSingleData(this.getparamid).subscribe((res) => {
      console.log(res)
      this.userForm.patchValue({
        firstname: res.data[0].firstname,
        lastname: res.data[0].lastname,
        email: res.data[0].email,
        address: res.data[0].address
      })
    })
  }

  userForm = new FormGroup({
    'firstname': new FormControl('', Validators.required),
    'lastname': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'address': new FormControl('', Validators.required)
  })
  userSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value)
      this.service.createData(this.userForm.value).subscribe((res) => {
        console.log(res, 'res==>');
        this.userForm.reset();
        this.successmsg = res.messeges;
        window.location.reload();
      })
    }
    else {
      this.errormsg = 'all field is required'
    }
  }
  //update data
  userUpdate() {
    console.log(this.userForm.value, 'updateform')
    if (this.userForm.valid) {
      this.service.updateData(this.userForm.value, this.getparamid).subscribe((res) => {
        console.log(res, 'res')
        this.successmsg = res.messeges;
        window.location.replace("http://localhost:4200/read");
        
      })
    }
    else {
      this.errormsg='all field is require'
    }
  }
}
