import { Subscription } from 'rxjs';
import { PostService } from './post.service';
import { Post } from './../../models/post';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: Post[];
  private postSubscription: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts = [];
    this.fetchPosts();
    this.postSubscription = new Subscription();
    this.postSubscription.add(this.postService.postUpdateObs.subscribe(flag => {
      if (flag) {
        console.log('i am gona update posts');
        this.fetchPosts();
      }
    }));

  }

  private fetchPosts(): void {
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  showDetail(post: Post): void {
    this.postService.setPostSubject(post);
  }

  refreshPosts($event): void {
    console.log('event from child ', $event);
    if ($event) {
      this.fetchPosts();
    }
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
}
