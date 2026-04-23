import { Component, Input } from '@angular/core';
import { Member } from '../../_models/member';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-member-card',
  imports: [RouterLink],
  templateUrl: './member-card.html',
  styleUrl: './member-card.css',
})
export class MemberCard {
  @Input() member: Member | undefined;


}
