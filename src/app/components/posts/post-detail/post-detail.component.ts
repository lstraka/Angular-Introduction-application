import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from './../post.service';
import { Post } from './../../../models/post';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  @Output() notifyParent = new EventEmitter<boolean>();

  public post: Post;
  private postSubscription: Subscription;
  public postDetailForm: FormGroup;

  constructor(private _snackBar: MatSnackBar, private postService: PostService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.postSubscription = this.postService.postObservable.subscribe(post => {
      this.post = post;
      this.postDetailForm = this.formBuilder.group({
        title: new FormControl(this.post ? this.post.title : '', [Validators.required, Validators.minLength(3), Validators.maxLength(20),]),
        body: new FormControl(this.post ? this.post.body : '', [Validators.required, Validators.minLength(10)])
      });
    });
  }


  edit(): void {
    console.log('edit clicked');
    if (this.postDetailForm.valid) {
      this.post.title = this.postDetailForm.value.title;
      this.post.body = this.postDetailForm.value.body;
      console.log('valid', this.postDetailForm.value, this.post);
      this.postService.editPost(this.post, this.post.id).subscribe(editPost => {
        console.log(editPost);
        // this.postService.notifyPostsUpdate();
        this.notifyParent.emit(true);
      });
    } else {
      this._snackBar.open('Your form is not valid please check messages', 'ACTION', { duration: 15000 });
      // alert('you form is not valid');
    }
  }

  removePost(): void {
    this.postService.removePost(this.post.id).subscribe(res => {
      console.log(res);
      // this.router.navigateByUrl('posts');
      this.postService.notifyPostsUpdate();
      this.postService.setPostSubject(null);
    });
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

}
