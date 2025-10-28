import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: "safeHtml",
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(html: any, args?: any): any {
    if (html) {
      const stringField = html.toString();
      if (this.checkIfIsUrl(stringField)) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(html);
      } else {
        return this.sanitizer.bypassSecurityTrustHtml(html);
      }
    } else {
      return html;
    }
  }

  checkIfIsUrl(html): boolean {
    return html.startsWith("blob:http") ? true : false;
  }
}
