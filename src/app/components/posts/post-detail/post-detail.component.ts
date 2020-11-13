import { PostService } from './../post.service';
import { Post } from './../../../models/post';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router} from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  public post: Post;
  private postSubscription: Subscription;
  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.postSubscription = this.postService.postObservable.subscribe(post => {
      this.post = post;
    });
  }

  edit() {
    this.postService.editPost(this.post, this.post.id).subscribe(editPost => {
      console.log(editPost);
    });
  }

  removePost() {
    this.postService.removePost(this.post.id).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('posts');
    });
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

}
