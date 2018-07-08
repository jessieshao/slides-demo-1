let n
inStart()
let timer = setInterval(()=>{ 
    makeLeave(getImage(n))
    .one('transitionend',(a)=>{
        makeEnter($(a.currentTarget))
    })
    makeCurrent(getImage(n+1))
    n += 1
},2000)
document.addEventListener('visibilitychange',function(a){
    if(document.hidden){
        window.clearInterval(timer)
    }else{
        timer = setInterval(()=>{ 
            makeLeave(getImage(n))
            .one('transitionend',(a)=>{
                makeEnter($(a.currentTarget))
            })
            makeCurrent(getImage(n+1))
            n += 1
        },2000)
    }
})


//功能函数
function getImage(n){
    return $(`.images > img:nth-child(${x(n)})`)
}
function inStart(){
    n=1
    $(`.images > img:nth-child(${x(n)})`).addClass('current')
    .siblings().addClass('enter')    
}
function x(n){
    if (n>3){
        n = n%3
        if(n===0){
            n = 3
        }
    }
    return n
}
function makeCurrent($node){
    $node.removeClass('leave enter').addClass('current')
}
function makeLeave($node){
    $node.removeClass('current enter').addClass('leave')
    return $node
}
function makeEnter($node){
    $node.removeClass('leave current').addClass('enter')
}
