import { Component, inject } from '@angular/core';
import { Members } from '../../_services/members';
import { Member } from '../../_models/member';
import { ActivatedRoute } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap/nav';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [NgbNavModule, GalleriaModule],
  templateUrl: './member-detail.html',
  styleUrl: './member-detail.css',
})
export class MemberDetail {
  member: Member | undefined;
  private membersService = inject(Members);
  private route = inject(ActivatedRoute);
  galleryImages: any[] = [];
  ngOnInit() {
    this.loadMember();
  }
  getImages() {
    return this.member?.photos?.map(photo => ({
      itemImageSrc: photo.url,
      thumbnailImageSrc: photo.url
    })) ?? [];
  }
  loadMember() {
    this.membersService.getMember(
      this.route.snapshot.paramMap.get('username')!
    ).subscribe(member => {
      this.member = member;
      this.galleryImages = this.getImages();
    });
  }



  /*   loadMember() {
      this.membersService.getMember(this.route.snapshot.paramMap.get('username')!).subscribe({
        next: member => this.member = member
      });
    }
   */

}
