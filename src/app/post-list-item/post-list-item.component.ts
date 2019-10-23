import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {
 
  @Input() postId : number = 0;
  @Input() postTitre : string = "titre";
  @Input() postContent: string = "content";
  @Input() postDate: Date = new Date;
  @Input() postLoveIts: number = 0;

  deleted : boolean = false;
   
    constructor(private postService: PostsService ) { }
  
    ngOnInit() {
    
    }
  
    onLike() {
      this.postLoveIts = this.postLoveIts + 1;
      this.postService.updatePost(this.postId,this.postLoveIts);
    }
    onDontLike() {
      this.postLoveIts = this.postLoveIts - 1;
      this.postService.updatePost(this.postId,this.postLoveIts);
    }

    onDelete(){
      this.postService.deletePost(this.postId);
      this.deleted = true;

    };
  
    getColor() {};

}
