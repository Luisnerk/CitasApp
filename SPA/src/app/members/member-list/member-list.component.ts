import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  // members$: Observable<Member[]> | undefined;
  members: Member[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams;
  user: User;
  genderList = [
    { value: "female", display: "Females" },
    { value: "male", display: "Males" }
  ]

  constructor(private membersService: MembersService, accountService: AccountService) {
    accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          this.userParams = new UserParams(user);
          this.user = user;
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.membersService.getMembers(this.userParams).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.members = response.result;
          this.pagination = response.pagination;
        }
      }
    });
  }

  resetFilters() {
    if (this.user) {
      this.userParams = new UserParams(this.user);
      this.loadMembers();
    }
  }

  pageChanged(event: any) {
    if (this.userParams.pageNumber !== event.page){
      this.userParams.pageNumber = event.page;
      this.loadMembers();
    }
  }

}
