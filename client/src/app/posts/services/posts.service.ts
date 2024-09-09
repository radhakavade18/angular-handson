import { Injectable } from "@angular/core";
import { Post } from "../models/post.model";
import { Subject, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdate = new Subject<{ posts: Post[]; postCount: number }>();
  private apiUrl = "http://localhost:3001/posts";

  constructor(private http: HttpClient, private router: Router) {}

  // get all posts
  getPosts(postPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        `${this.apiUrl}${queryParams}`
      )
      .pipe(
        // transform response data - update _id to id
        map((postData) => {
          return {
            posts: postData.posts.map((post: any) => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator,
              };
            }),
            maxPosts: postData.maxPosts,
          };
        })
      )
      .subscribe((transformedPostData) => {
        this.posts = transformedPostData.posts;
        this.postsUpdate.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts,
        });
      });
  }

  // observables for posts
  getPostUpdateListener() {
    return this.postsUpdate.asObservable();
  }

  // Add new post
  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);

    this.http
      .post<{ message: string; post: Post }>(this.apiUrl, postData)
      .subscribe((responseData) => {
        this.router.navigate(["/posts"]);
      });
  }

  // get single post
  getPost(id: string) {
    // return { ...this.posts.find((p) => p.id === id) };
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
    }>(`${this.apiUrl}/${id}`);
  }

  // update post
  updatePost(id: string, title: string, content: string, image: File | string) {
    // const post: Post = {
    //   id: id,
    //   title: title,
    //   content: content,
    //   imagePath: "",
    // };
    let postData: Post | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: "",
      };
    }

    this.http.put(`${this.apiUrl}/${id}`, postData).subscribe((res) => {
      this.router.navigate(["/posts"]);
    });
  }

  // delete post
  deletePost(postId: string) {
    return this.http.delete(`${this.apiUrl}/${postId}`);
  }
}
