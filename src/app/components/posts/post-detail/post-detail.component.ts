import { PostService } from './../post.service';
import { Post } from './../../../models/post';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  public post: Post;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.postObservable.subscribe(post => {
      this.post = post;
    });
  }

}
