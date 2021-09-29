import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatInput } from '@angular/material/input'
import { MatPaginator } from '@angular/material/paginator'
import { MatSelect } from '@angular/material/select'
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
  citiesList = new Set()
  provincesList = new Set()
  filter: string

  destroy$: Subject<void> = new Subject()

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  @ViewChild('input') input: MatInput
  @ViewChild('citySelect') citySelect: MatSelect
  @ViewChild('provinceSelect') provinceSelect: MatSelect

  constructor(private dataService: DataService, private dialog: MatDialog) {

    // Fetch the data and populate the table when it's ready
    this.dataService.getInstitutions()
    this.dataService.institutions$.pipe(takeUntil(this.destroy$)).subscribe((data: Institution[]) => {
      this.dataSource.data = data
      data.forEach(x => {
        this.citiesList.add(x.city)
        this.provincesList.add(x.province)
      })
      this.citiesList = new Set(Array.from(this.citiesList).sort())
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSelect(row: Institution) {
    this.selectedRow = row
  }

  onFilter(event: Event | string, source: string) {
    if (source === 'city') {
      this.filter = ''
      this.provinceSelect.value = ''
    } else if (source === 'province') {
      this.filter = ''
      this.citySelect.value = ''
    } else if (source === 'input') {
      this.provinceSelect.value = ''
      this.citySelect.value = ''
    }

    let filterValue = event
    if (typeof event !== 'string') {
      filterValue = (event.target as HTMLInputElement).value
    }
    this.dataSource.filter = (filterValue as string).trim().toLowerCase()

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
