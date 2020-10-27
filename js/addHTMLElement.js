class Options {
    constructor(height, width, bg, fontSize, textAlign) {
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }
    
    createDiv() {
        let elem = document.createElement('div');
        document.body.insertAdjacentElement('beforeend', elem);
        let param = `height:${this.height}px; 
                     width:${this.width}px; 
                     background:${this.bg}; 
                     font-size:${this.fontSize}px; 
                     text-align:${this.textAlign}`;
        elem.style.cssText = param;
    }
}

const item = new Options(300, 600, 'grey', 26, 'center');
    
item.createDiv();

const item2 = new Options(255, 400, 'orange', 18, 'center');
    
item2.createDiv();

const item3 = new Options(120, 800, 'red', 12, 'center');
    
item3.createDiv();

