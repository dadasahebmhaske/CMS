import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MasterService } from '@app/core/custom-services/master.service';
import { AppService } from '@app/core/custom-services/app.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { DatashareService } from '@app/core/custom-services/datashare.service';
import { EmployeeService } from '@app/features/master/employee/employee.service';
import { AppComponent } from '@app/app.component';
import { AllmasterService } from '../allmaster.service';
@Component({
  selector: 'sa-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']

})
export class EmployeeComponent implements OnInit, OnDestroy {
  public addArray: any = [];
  public bsValue = new Date();
  public bdata: any = [];
  public bulkDoc: any = {};
  public bulkAdd: any = {};
  public CityData: any = [];
  public empInfo: any;
  public chantype: any = [];
  public docTypeData: any = [];
  public DocFileName: string;
  public document: any = { DocTypId: '' };
  public dept;
  public employee: any = { IsActive: 'Y', RoleCode: '', Gender: '', MaritalStatus: '', BloodGrp: '', StateCode: '', CityCode: '' };
  public fd = new FormData();
  public filepreview: any;
  public inputType1 = 'password';
  public className = 'glyphicon-eye-close';
  public imgUrl: string;
  public loaderbtn: boolean = true;
  public removeDocUpdate: any = [];
  public StateData: any = [];
  public selectedFile: File = null;
  public designationData: any = [];DeptData:any=[];
  public datePickerConfig: Partial<BsDatepickerConfig>;
public maxDate:Date=new Date();
  constructor(private appService: AppService, private datashare: DatashareService, private employeeService: EmployeeService, private masterService: MasterService,private  allmasterService:AllmasterService) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange',maxDate:this.maxDate, dateInputFormat: 'DD-MMM-YYYY', showWeekNumbers: false, adaptivePosition: true, isAnimated: true });
  }
  ngOnInit() {
    this.appService.getAppData().subscribe(data => { this.empInfo = data; this.employee.CPCode=this.empInfo.CPCode; });
    this.datashare.GetSharedData.subscribe(data => this.employee = data == null ? {CPCode:this.empInfo.CPCode, IsActive: 'Y', DesigId: '', Gender: '', MaritalStatus: '', BloodGroup: '',DeptId:''} : data);
    this.allOnloadMethods();
    //this.imgUrl = `${AppComponent.ImageUrl}EmpDocs/`;
    this.employee.ReTypePassword = this.employee.Password;
    // this.employee.StateCode = this.employee.StateCode == null ? '' : this.employee.StateCode;
    // this.employee.CityCode = this.employee.CityCode == null ? '' : this.employee.CityCode;
  }

  allOnloadMethods() {
    this.allmasterService.getDepartment('Y').subscribe((resDat: any) => {
      if (resDat.StatusCode != 0) {
        this.DeptData = resDat.Data;console.log(resDat.Data);
      }
      else { this.DeptData = []; AppComponent.SmartAlert.Errmsg(resDat.Message); }
    });
    this.allmasterService.getDesignation('Y').subscribe((resD: any) => {
      if (resD.StatusCode != 0) {
        this.designationData = resD.Data;
      }
      else { this.designationData = []; AppComponent.SmartAlert.Errmsg(resD.Message); }
    });
  }
  onSubmit() {
    this.loaderbtn = false;
    this.employee.Flag = this.employee.EmpId == null || this.employee.EmpId == '' ? 'IN' : 'UP';
    this.employee.EmpId = this.employee.EmpId == null ? '' : this.employee.EmpId;
      this.employee.UserCode = this.empInfo.EmpId;
    let ciphertext = this.appService.getEncrypted(this.employee);
    this.allmasterService.post('ManageEmployee',ciphertext).subscribe((resData: any) => {
      this.loaderbtn = true;
      if (resData.StatusCode != 0) {
        AppComponent.SmartAlert.Success(resData.Message);
        AppComponent.Router.navigate(['/master/employee-master']);
      }
      else { AppComponent.SmartAlert.Errmsg(resData.Message); }
    });
  }
  // nextToDocumentDeatils() {
  //   this.loaderbtn = false;
  //   this.addArray.push({
  //     "AddressId": this.employee.AddressId == null ? '' : this.employee.AddressId,
  //     "AddressType": 'H',
  //     "StateCode": this.employee.StateCode,
  //     "CityCode": this.employee.CityCode,
  //     "PinCode": this.employee.PinCode,
  //     "AddressLineOne": this.employee.AddressLineOne,
  //     "AddressLineTwo": this.employee.AddressLineTwo,
  //     "AddressLineThree": this.employee.AddressLineThree,
  //     "IsActive": "Y"
  //   });
  //   this.bulkAdd.Flag = this.employee.AddressId == null ? "IN" : "UP";
  //   this.bulkAdd.data = this.addArray;
  //   this.bulkAdd.RefId = this.employee.EmpId;
  //   this.bulkAdd.FormFlag = 'EMP';
  //   //this.bulkAdd.AddressType = 'H';
  //   this.bulkAdd.UserCode = this.empInfo.EmpId;
  //   //let ciphertext = this.appService.getEncrypted(this.bulkAdd);
  //   // this.fd.append('CipherText', ciphertext);
  //   this.masterService.postBulkAddress(this.bulkAdd).subscribe((resData: any) => {
  //     this.loaderbtn = true;
  //     if (resData.StatusCode != 0) {
  //       this.employee.AddressId = resData.Data[0].AddressId
  //       AppComponent.SmartAlert.Success(resData.Message);
  //       this.getEmployeeDocumentDetails();
  //     }
  //     else { AppComponent.SmartAlert.Errmsg(resData.Message); }
  //   });
  // }

  // nextToSave() {
  //   if (this.bdata.length > 0 || this.removeDocUpdate.length > 0) {
  //     this.loaderbtn = false;
  //     this.bulkDoc.flag = this.employee.DocId == null ? 'IN' : 'UP';
  //     this.bulkDoc.RefId = this.employee.EmpId;
  //     this.bulkDoc.FormFlag = 'EMP';
  //     this.bulkDoc.UserCode = this.empInfo.EmpId;
  //     this.bulkDoc.bdata = this.bdata;
  //     if (this.removeDocUpdate.length > 0) {
  //       //this.bdata = this.bdata.concat(this.removeDocUpdate);
  //       let  docArray=this.bdata;
  //       docArray=docArray.concat(this.removeDocUpdate);
  //       this.bulkDoc.bdata = docArray;
  //     }
  //     let ciphertext = this.appService.getEncrypted(this.bulkDoc);
  //     this.fd.append('CipherText', ciphertext);
  //     this.masterService.postBulkDoc(this.fd).subscribe((resData: any) => {
  //       this.loaderbtn = true;
  //       if (resData.StatusCode != 0) {
  //         this.bdata = []; this.removeDocUpdate = [];
  //         if (resData.Data.length != 0)
  //           this.employee.DocId = resData.Data[0].DocId;
  //         AppComponent.SmartAlert.Success(resData.Message);
  //         AppComponent.Router.navigate(['/master/employee-master']);
  //       }
  //       else { AppComponent.SmartAlert.Errmsg(resData.Message); }
  //     });
  //   } else {
  //     AppComponent.SmartAlert.Errmsg(`Please Add atleast one document.`);
  //   }
  // }

 
  // onFileSelected(event) {
  //   var reader = new FileReader();
  //   this.selectedFile = <File>event.target.files[0];
  //   this.DocFileName = event.target.files[0].name;
  //   //this.DocFileName = `${this.empInfo.EmpId}_${this.DocFileName}`;
  //   reader.onload = (event: ProgressEvent) => {
  //     this.filepreview = (<FileReader>event.target).result;
  //     var f1 = this.selectedFile.name.substring(this.selectedFile.name.lastIndexOf('.'));
  //     f1 = f1.toString().toLowerCase();
  //     if (f1 == '.jpg' || f1 == '.png' || f1 == '.gif' || f1 == '.jpeg' || f1 == '.bmp' || f1 == '.txt' || f1 == '.excel' || f1 == '.xlsx' || f1 == '.pdf' || f1 == '.xps') {
  //     }
  //     else {
  //       $("#fileControl").val('');
  //       this.filepreview = 'assets/img/avatars/male.png'
  //       AppComponent.SmartAlert.Errmsg(`Choose only valid file `);
  //     }
  //   }
  //   reader.readAsDataURL(event.target.files[0]);
  // }
  // onSubmitDoc() {
  //   let docobj;
  //   docobj = this.masterService.filterData(this.docTypeData, this.document.DocTypId, 'DocTypId');
  //   this.document.DocType = docobj[0].DocType;
  //   this.document.DocId = '';
  //   this.document.DocFileName = this.DocFileName;
  //   this.document.IsActive = "Y";
  //   this.document.filepreview = this.filepreview;
  //   if (this.bdata.some(obj => parseInt(obj.DocNo) === parseInt(this.document.DocNo))) {
  //     AppComponent.SmartAlert.Errmsg("The Document is already added in list.");
  //     $("#fileControl").val('');
  //     this.document = { DocTypId: '' };
  //   } else {
  //     this.bdata.push(this.document);
  //     this.fd.append(`image${this.bdata.length}`, this.selectedFile, this.DocFileName);
  //     $("#fileControl").val('');
  //     this.document = { DocTypId: '' };
  //   }
  // }
  // onRemoveDoc(data, index) {
  //   if (data.DocId != '' && data.DocId != null) {
  //     data.IsActive = 'N';
  //     this.removeDocUpdate.push(data);
  //   } else {
  //     this.fd.delete(`image${index}`);
  //   }
  //   this.bdata.splice(index - 1, 1)
  // }
  // viewDocument(base64URL) {
  //   var win = window.open();
  //   win.document.write(`<iframe src="${base64URL}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
  // }
  // getEmployeeDocumentDetails() {
  //   this.masterService.getDocumentDetails('EMP', this.employee.EmpId).subscribe((response: any) => {
  //     if (response.StatusCode != 0)
  //       if (response.Data != null)
  //         this.bdata = response.Data;
  //   });
  // }
  // getEmployeeAddressDetails() {
  //   this.masterService.getAddressDetails('EMP', this.employee.EmpId).subscribe((resp: any) => {
  //     if (resp.StatusCode != 0)
  //       this.employee = Object.assign(this.employee, resp.Data[0]);
  //     this.getCityData();
  //   });
  // }

  checkingPassword() {
    if (this.employee.Password != this.employee.ReTypePassword && this.employee.ReTypePassword != null) {
      AppComponent.SmartAlert.Errmsg('Password and Re-enter Password must be same');
      this.employee.ReTypePassword = null;
    }
  }
  checkMaritalStatus(){
    if(this.employee.MaritalStatus=='unmarried'){
      this.employee.MarriageAnniversaryDate='';
    }
  }
  HideShowPassword1() {
    if (this.inputType1 === 'password') {
      this.inputType1 = 'text';
      this.className = 'glyphicon-eye-open';
    } else {
      this.inputType1 = 'password';
      this.className = 'glyphicon-eye-close';
    }
  }
  //custom change detection
  // ngDoCheck() {
  //   if (!this.lastModel) {
  //     // backup model to compare further with
  //     this.lastModel = Object.assign({}, this.model)
  //   } else {
  //     if (Object.keys(this.model).some(it=>this.model[it] != this.lastModel[it])) {
  //       // change detected
  //       this.steps.find(it=>it.key == 'step1').valid = !!(this.model.email && this.model.firstname && this.model.lastname);
  //       this.steps.find(it=>it.key == 'step2').valid = !!(this.model.country && this.model.city && this.model.postal);
  //       this.lastModel = Object.assign({}, this.model)
  //     }
  //   }
  // }
  ngOnDestroy() {
    this.datashare.updateShareData(null);
  }
}
