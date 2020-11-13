import { PostService } from './post.service';
import { Post } from './../../models/post';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts = [];

    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  showDetail(post: Post): void {
    this.postService.setPostSubject(post);
  }

}
