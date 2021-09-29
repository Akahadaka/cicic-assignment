import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Institution } from '@app/data/data.model'
import { DataService } from '@app/data/data.service'
import { EditDialogComponent } from '@app/shared/edit-dialog/edit-dialog.component'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit, OnDestroy {

  dataSource: MatTableDataSource<Institution> = new MatTableDataSource()

  displayedColumns = ['name', 'city', 'province', 'edit']

  selectedRow: Institution | null

  destroy$: Subject<void> = new Subject()

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(private dataService: DataService, private dialog: MatDialog) {

    // Fetch the data and populate the table when it's ready
    this.dataService.getInstitutions()
    this.dataService.institutions$.pipe(takeUntil(this.destroy$)).subscribe((data: Institution[]) => {
      this.dataSource.data = data
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSelect(row: Institution) {
    this.selectedRow = row
  }

  onFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  onCreate() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '800px',
      data: {
        action: 'create'
      }
    })
  }

  onEdit(row: Institution) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '800px',
      data: {
        action: 'update',
        institution: row
      }
    })
  }

  onDelete(id: number) {
    const ans = confirm('Are you sure you want to delete this institution?')
    if (ans) {
      this.dataService.deleteInstitute(id)
    }
  }

  onReload() {
    this.dataService.getInstitutions()
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
