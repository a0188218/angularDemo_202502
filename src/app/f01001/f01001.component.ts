import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { F01001Service } from './f01001.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { BaseService } from '../base.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

interface sysCode {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f01001',
  templateUrl: './f01001.component.html',
  styleUrls: ['./f01001.component.css', '../../assets/css/f01.css']
})
export class F01001Component implements OnInit, AfterViewInit {
  @ViewChild('absBox') absBox: ElementRef // 抓取table id
  total: number;
  empNo = BaseService.userId;
  readonly pageSize = 50;
  pageIndex = 1;
  cusinfoDataSource = [];// 案件清單
  newData = [];// 排序後的案件清單
  receiptNo: string;// 收件編號
  idNumber: string;// 身分證號
  custId: string;// 客戶ID
  prodName: string;// 產品類別
  productList: sysCode[] = [];// 產品類別下拉
  sort: string;// 排序
  tag: string;
  // 計算剩餘table資料長度
  get tableHeight(): string {
    if (this.absBox) {
      return (this.absBox.nativeElement.offsetHeight - 190) + 'px';
    }
  }

  constructor(private f01001Service: F01001Service, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.sort = 'ascend';
    this.productList = [
      { value: "LOAN_001", viewValue: "貸款申請" },
      { value: "FIN_002", viewValue: "交易異常調查" },
      { value: "LAW_003", viewValue: "企業訴訟案件" },
      { value: "IT_004", viewValue: "資安事件通報" },
      { value: "ECOM_005", viewValue: "退貨/退款申請" },
      { value: "MFG_006", viewValue: "工安事故報告" },
    ];
  }

  ngAfterViewInit() {
    this.getCaseList();
  }

  getCaseList() {
    let jsonObject: any = {};
    jsonObject['receiptNo'] = this.receiptNo;
    jsonObject['idNumber'] = this.idNumber;
    jsonObject['custId'] = this.custId;
    jsonObject['prodName'] = this.prodName;
    this.f01001Service.getDataList(jsonObject).subscribe(data => {
      if (data.rspBody.size > 0) {
        this.total = data.rspBody.size;
        this.cusinfoDataSource = data.rspBody.items;
        this.newData = this.f01001Service.getTableDate(this.pageIndex, this.pageSize, this.cusinfoDataSource);
      } else {
        this.newData = null;
        this.total = 0;
        const childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: "查無資料" }
        })
      }
    });
  }

  select() {
    this.changePage();
    this.getCaseList();
  }

  changePage() {
    this.pageIndex = 1;
    this.total = 1;
  }

  // 千分號標點符號(form顯示用)
  data_number(num: number) {
    this.tag = '';
    this.tag = (num + "")
    if (this.tag != null) {
      this.tag = this.tag.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return this.tag;
  }

  // 排序
  sortChange(e: string, param: string) {
    this.sort = '';
    switch (param) {
      case "startTime":
        this.cusinfoDataSource = e === 'ascend' ? this.cusinfoDataSource.sort(
          (a, b) => a.startTime.localeCompare(b.startTime)) : this.cusinfoDataSource.sort((a, b) => b.startTime.localeCompare(a.startTime))
        this.newData = this.f01001Service.getTableDate(this.pageIndex, this.pageSize, this.cusinfoDataSource);
        break;
      case "receiptNo":
        this.cusinfoDataSource = e === 'ascend' ? this.cusinfoDataSource.sort(
          (a, b) => a.receiptNo.localeCompare(b.receiptNo)) : this.cusinfoDataSource.sort((a, b) => b.receiptNo.localeCompare(a.receiptNo))
        this.newData = this.f01001Service.getTableDate(this.pageIndex, this.pageSize, this.cusinfoDataSource);
        break;
    }
  }

  // 清除資料
  clear() {
    this.receiptNo = "";
    this.idNumber = "";
    this.custId = "";
    this.empNo = BaseService.userId;
    this.prodName = "";
    this.getCaseList();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex } = params;
    if (this.pageIndex !== pageIndex) {
      this.pageIndex = pageIndex;
      this.newData = this.f01001Service.getTableDate(pageIndex, this.pageSize, this.cusinfoDataSource);
      const matTable = document.getElementById('matTable');
      matTable.scrollIntoView();
    }
  }
}
