import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostsService {

  private posts: Post[];

  postsSubject = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) { }

  emitPostsSubject() {
    if (this.posts && this.posts.length) {
      this.postsSubject.next(this.posts.slice());
    }
  }

  getPostById(id: number) {
    const post = this.posts.find(
      (s) => {
        return s.id === id;
      }
    );
    return post;
  }

  addPost(title: string, content: string)  {
    
    const newPost = new Post(title, content)
    if (this.posts && this.posts.length) {
      newPost.id = this.posts[(this.posts.length - 1)].id + 1;
      this.posts.push(newPost);
    } else {
      newPost.id = 0
      this.posts = [newPost]
    }
    this.savePostsToServer();
  }

  deletePost(id: number) {
    this.posts.splice(id, 1);
    // Tri et re-indexation du tableau
    this.posts.sort(function (a: Post, b: Post) {
      return a.id - b.id;
    })
    this.posts.forEach(function (item, index, array) {
      item.id = index;
    });

    this.savePostsToServer();
  }

  updatePost(id: number, loveIts: number) {

    this.posts[id].loveIts = loveIts;
    this.savePostsToServer();
  }

  savePostsToServer() {
    this.httpClient
      .put('https://ocr-demo-f3ac6.firebaseio.com/blogposts.json', this.posts)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
          this.emitPostsSubject();
          this.getPostsFromServer();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getPostsFromServer() {
    this.httpClient
      .get<any[]>('https://ocr-demo-f3ac6.firebaseio.com/blogposts.json')
      .subscribe(
        (response) => {
          this.posts = response;
          console.log('Retour ! : ' + response);
          this.emitPostsSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}
