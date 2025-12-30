class Clock{
    constructor(elem){
        let clock = document.querySelector(elem);
        if (!clock) {
            console.warn('Clock element not found:', elem);
            return;
        }
        this.hourE = clock.querySelector(".hour");
        this.minE = clock.querySelector(".min");
        this.secE = clock.querySelector(".sec");
    }
    showTime(d){
        if (!this.hourE || !this.minE || !this.secE) {
            return;
        }

        let h = d.getHours();
        let m = d.getMinutes();
        let s = d.getSeconds();
        let ms = d.getMilliseconds();
        
        this.hourE.style.transform = `rotate(${(h + m/60) * 30 }deg)`;
        this.minE.style.transform = `rotate(${(m + s/60) * 6 }deg)`;
        this.secE.style.transform = `rotate(${(s + ms/1000) * 6 }deg)`;

    }
}

var C = new Clock(".clocks .top .clock");   
if (C && C.hourE) {
    setInterval(() => {C.showTime(new Date());}, 200);
}
