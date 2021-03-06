export default class Cursor {
    constructor(options){
        this.w = options.w;
        this.h = options.h;
        this.bg = options.bg || '#1e1e1e';
        this.color = options.color || '#fff';
        this.$el = document.querySelector(options.$el);
        this.pos = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        };

        document.addEventListener('mousemove', (e) => this.move(e));
        document.addEventListener('click', () => this.interact('click'))

        const initCursorHandlers = () => {
            document.addEventListener('mouseover', (e) => {
                if(!e.target.classList.contains('js-cursor')) return;
                const cursorType = e.target.getAttribute('data-cursor-type');
                this.interact(cursorType);
            })
            document.addEventListener('mouseout', () => {
                this.interact();
            })
        };

        initCursorHandlers();
    }
    move(e){
        [this.pos.x, this.pos.y] = [e.clientX, e.clientY];

        this.$el.style.left = this.pos.x + 'px'
        this.$el.style.top = this.pos.y + 'px'
        this.$el.style.transition = 'all .05s linear'
    }
    resetStyles() {
        this.$el.style = '';
        this.$el.style.left = this.pos.x + 'px';
        this.$el.style.top = this.pos.y + 'px';
        this.$el.textContent = ''
    }
    interact(type){
        if(!type) {
            this.resetStyles()
            return
        }
        if(type === 'link'){
            this.$el.style.transition = 'all .2s linear'
            this.$el.style.opacity = '0'
            return
        }
        if(type === 'click'){
            this.$el.classList.add('click')

            setTimeout(() => {
                this.$el.classList.remove('click')
            }, 300)

            return
        }
        if(type === 'big'){
            this.$el.style.transition = 'all .4s linear'
            this.$el.style.width = '60px'
            this.$el.style.height = '60px'
            this.$el.style.opacity = '0.6'

            return
        }
        if(type === 'blend'){
            this.$el.style.transition = 'all .4s linear'
            this.$el.style.mixBlendMode = 'difference'
            this.$el.style.width = '150px'
            this.$el.style.height = '150px'
            this.$el.style.background = 'coral'
            this.$el.textContent = 'explore'
            this.$el.style.lineHeight = '150px'

            return
        }
    }

    
}