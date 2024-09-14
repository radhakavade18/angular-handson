import { Component, Input } from "@angular/core";
import { Post } from "../../models/post.model";
import { PostsService } from "../../services/posts.service";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"],
})
export class PostListComponent {
  posts: Post[] = [];
  isLoading: boolean = false;
  totalPosts: number = 0;
  postPerPage: number = 10;
  currentPage: number = 1;
  userId: string = "";
  pageSizeOptions = [1, 2, 5, 10];
  // to save subscrition
  private postsSub: Subscription | undefined;
  private authStatusSub: Subscription | undefined;
  userIsAuthenticated: boolean = false;

  constructor(
    private postService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.postService.getPosts(this.postPerPage, this.currentPage);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });

    // checks if user is logged in or not
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((result) => {
        this.userIsAuthenticated = result;
        this.userId = this.authService.getUserId();
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postService.getPosts(this.postPerPage, this.currentPage);
  }

  onDeletePost(postId: string) {
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(
      () => {
        this.postService.getPosts(this.postPerPage, this.currentPage);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.postsSub?.unsubscribe();
    this.authStatusSub?.unsubscribe();
  }
}
