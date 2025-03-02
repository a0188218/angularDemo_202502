import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { F03001Service } from './f03001.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BaseService } from '../base.service';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';

interface sysCode {
  value: string;
  viewValue: string;
}



interface sysTable {
  BUS_TYPECode: string;
  PRJ_CODE: string;
  PRJ_START_DATE: string;
}

interface sysAPI {
  codE_NO: string;
  codE_DESC: string;
}

@Component({
  selector: 'app-f03001',
  templateUrl: './f03001.component.html',
  styleUrls: ['./f03001.component.css', '../../assets/css/f03.css']
})
export class F03001Component implements OnInit {
  constructor(
    private http: HttpClient,
    private f03001Service: F03001Service,
    private fb: FormBuilder,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  uploadForm: FormGroup = this.fb.group({
    ERROR_MESSAGE: [this.data.errorMessage]
  });
  isExcelFile: boolean;
  fileToUpload: File | null = null;
  empNo: string;
  jsonBool = false;
  excelSource: any;
  block: boolean = false;

  ngOnInit(): void {
    this.empNo = BaseService.userId;
  }

  public async confirmAdd(): Promise<void> {
    if (this.fileToUpload == null) {
      this.uploadForm.patchValue({ ERROR_MESSAGE: "請上傳正確檔案!!" });
    } else {
      const formdata: FormData = new FormData();
      formdata.append('file', this.fileToUpload);
      let msgStr: string = "";
      let baseUrl = 'f01/f01011action1';
      this.block = true;
      this.f03001Service.uploadExcel(baseUrl, this.fileToUpload, this.empNo).subscribe(data => {
        let msg = "";
        let errorMsg = "";
        if (data.rspCode == "C1001" || data.rspCode == "C1002") {
          msg = data.rspMsg;
        } else {
          if (data.rspBody.length > 0) {
            msg = "\n 錯誤清單：\n";
            for (let i = 0; i < data.rspBody.length; i++) {
              errorMsg += "第" + data.rspBody[i].index + "筆,身分證字號：" + data.rspBody[i].nationalId + ",客戶ID：" + data.rspBody[i].custId + " 匯入失敗, 錯誤訊息：" + data.rspBody[i].errorMsg + "\n";
            }
            msg = msg + errorMsg;
          } else {
            msg = data.rspMsg;
          }
        }
        this.block = false;
        this.uploadForm.patchValue({ ERROR_MESSAGE: msg });
      });
    }
  }

  //檢查上傳檔案格式
  onChange(evt: any) {
    this.uploadForm.patchValue({ ERROR_MESSAGE: '' });
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.isExcelFile = !target.files[0].name.match(/(.xls|.xlsx)/);
    if (this.isExcelFile) {
      this.fileToUpload = target.files.item(0);
    } else {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "非excel檔，請檢查檔案格式重新上傳" }
      });
    }
  }



}
