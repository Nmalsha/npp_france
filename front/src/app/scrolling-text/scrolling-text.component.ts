import { Component } from '@angular/core';

@Component({
  selector: 'app-scrolling-text',
  templateUrl: './scrolling-text.component.html',
  styleUrl: './scrolling-text.component.css',
})
export class ScrollingTextComponent {
  items = [
    { text: 'this is my first text;n;ng;rfnk:n:knrgj:l,grd:' },
    { text: 'this is my second textgfdsgdgdhtfesjgfegfje,fhgj,hgr' },
    { text: 'this is my third textbfkjhrekgfkrehkejtherg' },
    // Add more items as needed
  ];
}
