import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

import { forbiddenNameValidator, forbiddenPwdValidator, crossFieldValidator } from './shared/custom-val.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //The two building blocks of reactive forms r FormFroup and FormControl. FormGroup represents the whole form in total, anf the formControl represents individual elements of form
  //We need to create a formGroup object and bind it to the form tag in html. To create a formGroup object, it takes an object as a parameter, which inturn contains objects
  //of each form elements. Each forms elements r identified by the formControlName attribute in html
  public reactiveForm = new FormGroup({
    username: new FormControl('John'),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  })

  public reactiveForm2 = new FormGroup({
    username: new FormControl('John'),
    address: new FormGroup({                  //Other than representing the entire form, the form group class can also be used to group together different formcontrols
      city: new FormControl(''),
      state: new FormControl(''),
      postalCode: new FormControl('')
    })
  })

  public reactiveForm3 = new FormGroup({
    username: new FormControl('John'),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      postalCode: new FormControl('')
    })
  })

  loadData() {
    //When user wants to set the values from an API or service, we cant make use of setValue() method to set values of input field elements
    this.reactiveForm3.setValue({
      username: 'Bob',
      password: 'test',
      confirmPassword: 'test',
      address: {
        city: "City",
        state: "State",
        postalCode: '123456'
      }
    })

    //Note: setValue() can only be used, when u want to load all the fields of formGroup. If u want to set values to only some elements of formGroup u should use patchValue() method
  }

  //We can also make use of formBulider service, instead of formGroup and formControl. Using this service we can also validate the form elements

  constructor (private fb: FormBuilder) {}
  public reactiveForm4 = this.fb.group({      //Instead of creating an instance of FormGroup, we call the group method of formBuilder service
    username: ['John'],                       //and instead of instanciating FormControl class, we just simply create an array with 0th index as defau;t name of the form element
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  })

  public reactiveForm5 = this.fb.group({
    username: ['John', Validators.required],      //1st index is for applying validation. Here we have used the built-in validation of angular using Validators class.
    password: ['', [Validators.required, Validators.minLength(3)]],     //If we want to apply more that one validation conditions, then write all the conditions into an array, at 1st index
    confirmPassword: [''],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  })

  get password() {
    return this.reactiveForm5.get('password')
  }

  public reactiveForm6 = this.fb.group({
    username: ['John', [Validators.required, Validators.minLength(3), forbiddenNameValidator]],
    password: ['', [Validators.required, Validators.minLength(3), forbiddenPwdValidator(/password/), forbiddenPwdValidator(/admin/)]],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  })

  get username() {
    return this.reactiveForm6.get('username')    
  }
  
  get password2() {
    return this.reactiveForm6.get('password')
  }
  
  public reactiveForm7 = this.fb.group({
    username: ['John', [Validators.required, Validators.minLength(3), forbiddenNameValidator]],
    password: ['', [Validators.required, Validators.minLength(3), forbiddenPwdValidator(/password/), forbiddenPwdValidator(/admin/)]],
    confirmPassword: ['']
  }, {validator: crossFieldValidator})
  
  get username3() {
    return this.reactiveForm7.get('username')    
  }
  
  get password3() {
    return this.reactiveForm7.get('password')
  }

  public reactiveForm8: any
  public reactiveForm9: any

  ngOnInit(): void {
    this.reactiveForm8 = this.fb.group({
      username: ['John', [Validators.required, Validators.minLength(3), forbiddenNameValidator]],
      email: [''],
      subscribe: [false]
    })

    this.reactiveForm8.get('subscribe').valueChanges.subscribe((checkedValue: any) => {
      const email = this.reactiveForm8.get('email')
      if (checkedValue) {
        email.setValidators(Validators.required)
      } else {
        email.clearValidators()
      }
      email.updateValueAndValidity()
    })

    this.reactiveForm9 = this.fb.group({
      username: ['John', [Validators.required, Validators.minLength(3), forbiddenNameValidator]],
      email: [''],
      subscribe: [false],
      alternateEmails: this.fb.array([])
    })

    this.reactiveForm9.get('subscribe').valueChanges.subscribe((checkedValue: any) => {
      const email = this.reactiveForm9.get('email')
      if (checkedValue) {
        email.setValidators(Validators.required)
      } else {
        email.clearValidators()
      }
      email.updateValueAndValidity()
    })
  }
  
  get username4() {
    return this.reactiveForm8.get('username')
  }
  
  get email() {
    return this.reactiveForm8.get('email')
  }
  
  get username5() {
    return this.reactiveForm9.get('username')
  }
  
  get email2() {
    return this.reactiveForm9.get('email')
  }

  get alternateEmails() {
    return this.reactiveForm9.get('alternateEmails') as FormArray
  }

  addAlternateEmail(){
    this.alternateEmails.push(this.fb.control(''))  
  }

}
