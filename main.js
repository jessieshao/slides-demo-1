let $buttons = $('#buttonWapper>button')
let $slides = $('#slides')
let $images = $('#slides>img')
let current = 0
$slides.css({transform: 'translateX(-500px)'})

makeFakeSlides()
listenEvents()

$('#pre').on('click',function(){
    goToSlides(current -1)
})
$('#next').on('click',function(){
    goToSlides(current +1)
})

let timer = setInterval(function(){
    goToSlides(current + 1)
},2000)

$('.container').on('mouseenter',function(){
    window.clearInterval(timer)
}).on('mouseleave',function(){
    timer = setInterval(function(){
        goToSlides(current + 1)
    },2000)
})

document.addEventListener('visibilitychange',function(){
        if(document.hidden){
            window.clearInterval(timer)
        }else{
            timer = setInterval(function(){
                goToSlides(current + 1)
            },2000) 
        }
    })

function listenEvents(){
    $('#buttonWapper').on('click','button',function(e){
        let $button = $(e.currentTarget)
        let index = $button.index()
        goToSlides(index)
        $button.css({background: 'grey'}) 
        $button.siblings().css({background: 'white'})
       
    })
    
}



function goToSlides(index){
    if(index> $buttons.length-1){
        index = 0
    }else if(index < 0){
        index = $buttons.length -1
    }
    console.log(current,index)
    if(current === $buttons.length - 1 && index === 0){
        //最后一张到第一张
        $slides.css({transform: `translateX(${-($buttons.length +1)* 500}px)`})    
            .one('transitionend',function(){
                $slides.hide()
                .offset()
                $slides.css({transform: 'translateX(-500px)'}).show()
            })
    }else if(index === $buttons.length - 1 && current === 0){
        //第一张到最后一张
        $slides.css({transform: `translateX(0px)`})    
            .one('transitionend',function(){
                $slides.hide()
                .offset()
                $slides.css({transform: `translateX(${-(index +1)* 500}px)`}).show()
            })
    }else{
        $slides.css({transform: `translateX(${-(index +1) * 500}px)`})  
    }
    current = index
}

function makeFakeSlides(){
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length-1).clone(true)
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}
