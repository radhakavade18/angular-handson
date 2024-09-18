import { Component } from "@angular/core";
import { Post } from "../../models/post.model";
import { PostsService } from "../../services/posts.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { mimeTypeValidator } from "./mime-type.validator";
import { AuthService } from "src/app/services/auth.service";
import { Subscription } from "rxjs";

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
  form!: FormGroup;
  imagePreview: string = "";
  authStatusSubject: Subscription | undefined;

  constructor(
    public postService: PostsService,
    public router: Router,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSubject = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
    this.form = new FormGroup({
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      content: new FormControl("", [Validators.required]),
      image: new FormControl(null, [Validators.required], [mimeTypeValidator]),
    });

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
            imagePath: postData.imagePath,
            creator: postData.creator,
          };
          this.form?.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath,
          });
        });
      } else {
        this.mode = "create";
        this.postId = "";
      }
    });
  }

  onImagePicker(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      this.form.patchValue({
        image: file,
      }); // storing file object
      // -----------------------------------
      // updateValueAndValidity is a method in Angular's AbstractControl class (which is the base class for
      //   FormControl, FormGroup, and FormArray). This method is used to recalculate the value and validation
      //   status of a form control or group of controls.
      this.form.get("image")?.updateValueAndValidity();
      // create reader
      const reader = new FileReader();
      // once file load add result in imagePreview
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.postService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form?.reset();
  }

  ngOnDestroy() {
    this.authStatusSubject?.unsubscribe();
  }
}
