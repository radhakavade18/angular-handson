import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[appPreventCopyPaste]",
})
export class PreventCopyPasteDirective {
  constructor() {}

  @HostListener("copy", ["$event"])
  @HostListener("cut", ["$event"])
  @HostListener("paste", ["$event"])
  onEvent(event: ClipboardEvent): void {
    event.preventDefault();
  }
}
