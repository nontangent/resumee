import { Component, OnInit, Inject, ViewChild, ElementRef, HostListener, PLATFORM_ID } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Resumee Work';

  constructor(
    @Inject(PLATFORM_ID) private platformId, 
    public appService: AppService,
    private router: Router
  ) { }

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if(this.isBrowser) {
      window.addEventListener('dragover', (event) => this.onDragOver(event));
      window.addEventListener('dragleave', (event) => this.onDragLeave(event));
      window.addEventListener('drop', (event) => this.onDrop(event));
      // this.changeDetectorRef.detectChanges();
    }
  }

  @ViewChild('fileInput', {static: false})
  fileInput: ElementRef;

  // @HostListener('dragover', ['$event'])
  onDragOver($event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  // @HostListener('dragleave', ['$event'])
  onDragLeave($event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  // @HostListener('drop', ['$event'])
  onDrop($event){
    $event.preventDefault();
    $event.stopPropagation();

    let files = $event.dataTransfer.files;
    let items = $event.dataTransfer.items

    if (files.length > 0) {
      this.fileInput.nativeElement.files = files;
      console.debug('files:', files);
      this.selectedFiles(files);
    }
  }

  selectedFiles(files: File[]) {
    const file: File = files[0];

    // 10KB以下の判定
    if (file.size > 10 * 1024) {
      alert('File size must be smaller than 10KB!');
      return
    }
    // 拡張子が.mdか判定
    if (getExt(file.name) == '.md') {
      alert('File type must be Markdown!');
      return
    }

    this.appService.uploadMarkdown(file).subscribe((res: {target: string}) => {
      console.debug('res.target:', res.target);
      this.router.navigate(['/'], { queryParams: {target: res.target} });
    });

  }

}

function getExt(filename: string) {
	var pos = filename.lastIndexOf('.');
	if (pos === -1) return '';
	return filename.slice(pos + 1);
}