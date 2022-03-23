import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-regform',
  templateUrl: './regform.component.html',
  styleUrls: ['./regform.component.css']
})
export class RegformComponent implements OnInit {
  regForm: any = FormGroup;
  otpForm: any = FormGroup;
  isShown: boolean = false;
  main: boolean = true;
  submitted = false;
  otpsubmitted = false;
  display: any;
  end = false;
  arr: any;
  count: number = 1;



  constructor(private otpservice: ServiceService, private formBuilder: FormBuilder,public router: Router) { }

  ngOnInit(): void {
    this.regForm = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.maxLength(140)]],
      mobile: ['', [Validators.required, Validators.pattern("^[0-9]{10}$"), Validators.minLength(10), Validators.maxLength(10)]],
      city: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]],
      panNumber: ['', [Validators.required, Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]$")]],
    })
    this.otpForm = this.formBuilder.group({
      otp: ['', [Validators.required,Validators.minLength(4)]]
    })
  }
  get f() {
    return this.regForm.controls;
  }
  get g() {
    return this.otpForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.regForm.invalid) {
      console.log("this.contact.invalid", this.regForm.invalid); alert("Please fill out all mandatory fields")


      return;
    }
    let data = {
      fullname: this.regForm.value.fullname,
      mobile: this.regForm.value.mobile,
      city: this.regForm.value.city,
      email: this.regForm.value.email,
      panNumber: this.regForm.value.panNumber,

    }
    this.timer(1);
    this.main = !this.main;
    this.isShown = !this.isShown;
    // alert('SUCCESS: \n\n'+JSON.stringify(this.regForm.value))
    // console.log("++++++Success++++++");
    this.arr = JSON.stringify(this.regForm.value)


    this.otpservice.otpPost(data).subscribe((res: any) => {
      console.log("++++++RESPONSE PAYLOAD++++++", res);
    })




  }
  timer(minute: any) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        this.count++
        this.end = false;
        // console.log("finished");
        clearInterval(timer);
        if (this.count <= 3) {
          this.end = true;
        }
      }

    }, 1000);
  }
  resend() {

    console.log("count", this.count);
    if (this.count == 3) {
      this.end = false;

    }
    // console.log("arrrrrrr",this.arr);
    this.otpservice.otpPost(this.arr).subscribe((res: any) => {
      console.log("++++++RESPONSE PAYLOAD++++++", res);
    })
    this.end = false;
    this.timer(1);

  }



  verify() {
    this.otpsubmitted = true;
    if (this.otpForm.invalid) {
      // console.log("this.contact.invalid", this.regForm.invalid); alert("Please fill all the fields")
      return;
    }
    let otpArry = JSON.parse(this.arr);
    // console.log("mobileNumber", otpArry.mobile);
    let data = {
      mobile: otpArry.mobile,
      otp: this.otpForm.value.otp
    }
    console.log("+++OTP Data++++", data);

    this.otpservice.otpPost(data).subscribe((res: any) => {
      console.log("++++++Response from DB++++++", res);
      if(res){
          const navigationExtras: NavigationExtras = {
            queryParams: {
              // data:data,
              data: JSON.stringify(otpArry.fullname)
            },
          };
      
          this.router.navigate(["../success"], navigationExtras);
          // console.log("Widgetdata", otpArry.fullname)
      
      }
    })
  }
 

}
