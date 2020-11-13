import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Post } from './../../models/post';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseURL = 'http://localhost:3000/';

  private postSubject: BehaviorSubject<Post>;
  public postObservable: Observable<Post>;

  private postsUpdateSubject: Subject<boolean>;
  public postUpdateObs: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.postSubject = new BehaviorSubject<Post>(null);
    this.postObservable = this.postSubject.asObservable();

    this.postsUpdateSubject = new Subject<boolean>();
    this.postUpdateObs = this.postsUpdateSubject.asObservable();
  }

  public getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseURL + 'posts');
  }

  public setPostSubject(post: Post): void {
    this.postSubject.next(post);
  }

  public editPost(post: Post, id: number): Observable<Post> {
    return this.http.put<Post>(`${this.baseURL}posts/${id}`, post);
  }

  public removePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}posts/${id}`);
  }

  public notifyPostsUpdate(): void {
    this.postsUpdateSubject.next(true);
  }
}
