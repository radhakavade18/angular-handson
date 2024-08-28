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
  post: any = { title: "", content: "" };
  isLoading: boolean = false;

  constructor(
    public postService: PostsService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId") ?? "";
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe((postData) => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
        });
      } else {
        this.mode = "create";
        this.postId = "";
      }
    });
  }

  onSavePost(form: any) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.postService.addPost(form.value.title, form.value.content);
    } else {
      this.postService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
}
