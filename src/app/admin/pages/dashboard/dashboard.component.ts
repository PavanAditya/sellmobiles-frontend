import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AdminService } from '../../admin.service';
import { tableData } from '../../../core/mocks/table-data.mock';
import { UserResponse } from '../../../shared/models/user-response.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public displayedColumns = tableData.displayedColumns;
  public dataSource: MatTableDataSource<UserResponse>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public registeredUsersCount: number;
  public onlineUsersCount: number;
  public totalPosts: number;
  public places = [];
  public soldMobilesCount: number;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.getOnlineUsers();
    this.getOnlineUsersCount();
    this.getRegisteredUsersCount();
    this.getTopLikedImages();
    this.getTotalPostsCount();
    this.getTotalMobilesSold();
  }

  public getOnlineUsers(): void {
    this.adminService.onlineUserDetails().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public getOnlineUsersCount(): void {
    this.adminService.countOnlineUserDetails().subscribe((result) => {
      this.onlineUsersCount = result.data;
    });
  }

  public getTotalMobilesSold(): void {
    this.adminService.countTotalMobilesSold().subscribe((result) => {
      this.soldMobilesCount = result.data;
    });
  }

  public getTotalPostsCount(): void {
    this.adminService.countTotalPosts().subscribe((result) => {
      this.totalPosts = result.data;
    });
  }

  public getRegisteredUsersCount(): void {
    this.adminService.countUserDetails().subscribe((result) => {
      this.registeredUsersCount = result.data;
    });
  }

  public getTopLikedImages(): void {
    this.adminService.topLikedImages().subscribe((result) => {
      this.places = result.data;
    });
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
