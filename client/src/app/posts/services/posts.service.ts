import { Injectable } from "@angular/core";
import { Post } from "../models/post.model";
import { Subject, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdate = new Subject<Post[]>();
  private apiUrl = "http://localhost:3001/posts";

  constructor(private http: HttpClient, private router: Router) {}

  // get all posts
  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(this.apiUrl)
      .pipe(
        // transform response data - update _id to id
        map((postData) => {
          return postData.posts.map((post: any) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((transformedPost) => {
        this.posts = transformedPost;
        this.postsUpdate.next([...this.posts]);
      });
  }

  // observables for posts
  getPostUpdateListener() {
    return this.postsUpdate.asObservable();
  }

  // Add new post
  addPost(title: string, content: string) {
    const post: Post = {
      id: "",
      title: title,
      content: content,
    };

    this.http
      .post<{ message: string; postId: string }>(this.apiUrl, post)
      .subscribe((responseData) => {
        const postId = responseData.postId;
        post.id = postId;
        this.posts.push(post);
        this.postsUpdate.next([...this.posts]);
        this.router.navigate(["/posts"]);
      });
  }

  // get single post
  getPost(id: string) {
    // return { ...this.posts.find((p) => p.id === id) };
    return this.http.get<{ _id: string; title: string; content: string }>(
      `${this.apiUrl}/${id}`
    );
  }

  // update post
  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };

    this.http.put(`${this.apiUrl}/${id}`, post).subscribe((res) => {
      console.log(res);
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex((p) => p.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdate.next([...this.posts]);
      this.router.navigate(["/posts"]);
    });
  }

  // delete post
  deletePost(postId: string) {
    this.http.delete(`${this.apiUrl}/${postId}`).subscribe(() => {
      const updatedPost = this.posts.filter((post) => post.id !== postId);
      this.posts = updatedPost;
      this.postsUpdate.next([...this.posts]);
    });
  }
}
