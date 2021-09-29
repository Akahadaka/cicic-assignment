import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { DataService } from '@app/data/data.service'

@Component({
    selector: 'app-edit-dialog',
    templateUrl: './edit-dialog.component.html',
    styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit {
    form = this.fb.group({
        id: [this.data.institution?.id],
        name: [this.data.institution?.name],
        city: [this.data.institution?.city],
        province: [this.data.institution?.province],
        sector: [this.data.institution?.sector],
        education: [this.data.institution?.education],
        status: [this.data.institution?.status],
    });

    action = this.data.action

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditDialogComponent>,
        private dataService: DataService,
        @Inject(MAT_DIALOG_DATA) private data: any
    ) {}

    ngOnInit(): void {}

    close() {
        this.dialogRef.close();
    }

    update() {
        this.dataService.updateInstitute(this.form.value)
    }

    create() {
        this.dataService.createInstitute(this.form.value)
    }
}
