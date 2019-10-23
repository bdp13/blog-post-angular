import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: any[] = [];
  postsSubscription: Subscription;

  constructor(private postService:PostsService) { }

  ngOnInit() {

    this.postsSubscription = this.postService.postsSubject.subscribe(
      (posts: any[]) => {
        this.posts = posts;
      }
    );
    this.postService.getPostsFromServer();
   
  }
  ngOnDestroy() {

    this.postsSubscription.unsubscribe();
  }

}
