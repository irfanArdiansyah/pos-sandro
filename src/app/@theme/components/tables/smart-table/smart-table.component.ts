import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../../@core/data/smart-table';
import { AttachmentService } from '../../../../services/attachment/attachment.service';
import * as moment from 'moment';


@Component({
  selector: 'ngx-smart-table-shared',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent implements OnChanges {
  @Input() data;
  @Input() columns;
  @Input() title = 'Smart Table';
  @Input() calculate = false
  @Output() onDelete = new EventEmitter<any>();
  @Output() onCreate = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  settings:any = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    }
  };
  source: any = new LocalDataSource();

  constructor(
    private service: SmartTableData,
    private attachmentServ:AttachmentService,

  ) {
    if (this.columns) {
      this.settings.columns = this.columns
    }
    if(this.calculate)
      this.settings.actions = {
        custom: [
          {
            name: 'view',
            title: 'View ',
          },
          {
            name: 'edit',
            title: 'Edit ',
          },
          {
            name: 'delete',
            title: 'Delete ',
          },
          {
            name: 'duplicate',
            title: 'Duplicate ',
          },
        ],
    }


    // const data = this.service.getData();
    // this.source.load(data);

    if (this.data)
      this.source.load(this.data);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data)
      if (this.data)
        this.source.load(this.data);
    if (changes.calculate)
      if(this.calculate)
        this.settings.actions = {
          custom: [
            {
              name: 'view',
              title: 'View ',
            },
            {
              name: 'edit',
              title: 'Edit ',
            },
            {
              name: 'delete',
              title: 'Delete ',
            },
            {
              name: 'duplicate',
              title: 'Duplicate ',
            },
          ],
      }
    if (changes.columns)
      if (this.columns) {
      const settings = {...this.settings}
      settings.columns = this.columns
      this.settings = settings
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      this.onDelete.emit(event)
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    this.onCreate.emit(event)
  }


  onEditConfirm(event) {
    this.onEdit.emit(event)
  }

  downloadReport(){
    this.attachmentServ.downloadExcel(this.source.data, "Data " + this.title + moment().format("_DD_MM_YYYY_hh_mm_ss"))
  }

}
