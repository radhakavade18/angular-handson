import { Component } from "@angular/core";
import { Post } from "../../models/post.model";
import { PostsService } from "../../services/posts.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"],
})
export class PostCreateComponent {
  mode: string = "create";
  postId: string = "";
  post: Post[] = [];

  constructor(
    public postService: PostsService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   if (paramMap.has("postId")) {
    //     this.mode = "edit";
    //     this.postId = paramMap.get("postId") ?? ""; // Fix this type check
    //     console.log("postID", paramMap.get("postId"));
    //     // this.post = this.postService.getPost(this.postId);
    //   } else {
    //     this.mode = "create";
    //     this.postId = "";
    //   }
    // });
  }

  onAddPost(form: any) {
    if (form.invalid) {
      return;
    }

    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
    this.router.navigateByUrl("/posts");
  }
}
