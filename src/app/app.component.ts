import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

import { getContainers, createContainer, listBlob, BLOBItem, CONTENT, uploadFile, deleteBlob, deleteContainer, downloadBlob } from './app.storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'azure demo-ng';
  containers: any = [];
  selectedContainer: string = '';
  listItems: any = [];
  constructor() {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  async getContainers() {
    getContainers().then((res: Array<string>) => {
      this.containers = res;
    })
  }

  upload(file: any) {
    console.log(file.files.length);
    if (file.files.length > 0) {
      [...file.files].forEach((file: any) => {
        let content: CONTENT = {
          containerName: this.selectedContainer,
          file: file,
          filename: `${this.selectedContainer}-${Date.now()}.${file.name.split('.')[1]}`
        };
        uploadFile(content).then((res: string) => {
          console.log(res);
        })
        console.log(file);
      })

    }

  }

  create(value: string) {
    createContainer(value).then((resp) => {
      console.log(resp);
    });

  }

  async listFiles(containerName: string) {
    this.selectedContainer = containerName;
    listBlob(containerName).then((res: Array<BLOBItem>) => {
      this.listItems = res;
      console.log(res);
    })
  }

  setContainer(value: string){
    this.selectedContainer = value
  }

  delete(value: string) {
    deleteBlob(this.selectedContainer, value).then((resp: string) => {
      console.log(resp);
    });
  }

  deleteContainer(value: string) {
    deleteContainer(value).then((resp: string) => {
      console.log(resp);
    });
  }

  downloadFile(filename: string) {
    downloadBlob(this.selectedContainer,filename).then((resp: string) => {
      console.log(resp);
    });
  }
  
}