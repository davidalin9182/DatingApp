import { Component, inject } from '@angular/core';
import { Member } from '../../_models/member'
import { Members } from '../../_services/members';
import { MemberCard } from '../member-card/member-card';
@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCard],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList {
  members: Member[] = []
  private  memberService = inject(Members);
  
  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
    });
  }

}
