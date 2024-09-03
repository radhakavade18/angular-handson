import { Component, Input } from "@angular/core";
import { Post } from "../../models/post.model";
import { PostsService } from "../../services/posts.service";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"],
})
export class PostListComponent {
  posts: Post[] = [];
  isLoading: boolean = false;
  totalPosts: number = 0;
  postPerPage: number = 2;
  currentPage: number = 1;
  pageSizeOptions = [1, 2, 5, 10];
  // to save subscrition
  private postsSub: Subscription | undefined;

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postPerPage, this.currentPage);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postService.getPosts(this.postPerPage, this.currentPage);
    console.log(pageData);
  }

  onDeletePost(postId: string) {
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts(this.postPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.postsSub?.unsubscribe();
  }
}
