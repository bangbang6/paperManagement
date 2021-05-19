<template>
  <div class="login-main" style="height:100%;">
    <div class="head">
      <div class="title-wrapper">
          <div class="title">华中科技大学成果管理系统</div>
          <div class="sub-title">HUST ACHIEVEMENT MANAGEMENT SYSTEM</div>
      </div>
      <div class="nav" @click="navJump">
        <div :class="['nav-item',navIndex === 0?'blue':'']" data-item="0">登录</div>
        <div :class="['nav-item',navIndex === 1?'blue':'']" data-item="1">注册</div>
        <div :class="['nav-item',navIndex === 2?'blue':'']" data-item="2">修改密码</div>
      </div>
      <div class="tel-wrapper">
        <i class="iconfont">&#xe7ae;</i>
        <div class="tel">15798015790</div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
 
<script>
export default {

  computed: {

  },
  methods: {
    navJump (e) {

      if (e.target.dataset.item === '0') {

        this.$router.push('/login')
      } else if (e.target.dataset.item === '1') {

        this.$router.push('/register')
      } else if (e.target.dataset.item === '2') {
        this.$router.push('/changePassword')
      }


    },

  },
  watch: {
    $route: {
      handler: function (newV) {
        if (newV.name === 'login') {
          this.navIndex = 0
        }
        else if (newV.name === 'register') {
          this.navIndex = 1
        }
        else if (newV.name === 'changePassword') {
          this.navIndex = 2
        }
      },
      immediate: true
    }

  }
}

!function(){
    function n(n,e,t){
        return n.getAttribute(e)||t
    }
    function e(n){
        return document.getElementsByTagName(n)
    }
    function t(){
        var t=e("script"),o=t.length,i=t[o-1];
        return{
            l:o,z:n(i,"zIndex",-1),o:n(i,"opacity",.5),c:n(i,"color","0,0,0"),n:n(i,"count",99)
        }
    }
    function o(){
        a=m.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,
            c=m.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight
    }
    function i(){
        r.clearRect(0,0,a,c);
        var n,e,t,o,m,l;
        s.forEach(function(i,x){
            for(i.x+=i.xa,i.y+=i.ya,i.xa*=i.x>a||i.x<0?-1:1,i.ya*=i.y>c||i.y<0?-1:1,r.fillRect(i.x-.5,i.y-.5,1,1),e=x+1;e<u.length;e++)n=u[e],
            null!==n.x&&null!==n.y&&(o=i.x-n.x,m=i.y-n.y,
                l=o*o+m*m,l<n.max&&(n===y&&l>=n.max/2&&(i.x-=.03*o,i.y-=.03*m),
                t=(n.max-l)/n.max,r.beginPath(),r.lineWidth=t/2,r.strokeStyle="rgba("+d.c+","+(t+.2)+")",r.moveTo(i.x,i.y),r.lineTo(n.x,n.y),r.stroke()))
        }),
            x(i)
    }
    var a,c,u,m=document.createElement("canvas"),
        d=t(),l="c_n"+d.l,r=m.getContext("2d"),
        x=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||
            function(n){
                window.setTimeout(n,1e3/45)
            },
        w=Math.random,y={x:null,y:null,max:2e4};m.id=l,m.style.cssText="position:fixed;top:0;left:0;z-index:"+d.z+";opacity:"+d.o,e("body")[0].appendChild(m),o(),window.onresize=o,
        window.onmousemove=function(n){
            n=n||window.event,y.x=n.clientX,y.y=n.clientY
        },
        window.onmouseout=function(){
            y.x=null,y.y=null
        };
    for(var s=[],f=0;d.n>f;f++){
        var h=w()*a,g=w()*c,v=2*w()-1,p=2*w()-1;s.push({x:h,y:g,xa:v,ya:p,max:6e3})
    }
    u=s.concat([y]),
        setTimeout(function(){i()},100)
}();
</script>
<style lang="scss" scoped>
    .login-main{
       // background: url('../assets/bg1.jpg');
    }
    .login-wrapper{
        height:calc(100% - 78px);
    }
.head {
  margin-left: 15%;
  width: 70%;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .title-wrapper {
    height: 35px;
    .title {
      font-size: 18px;
      font-weight: 400;
    }
    .sub-title {
      font-size: 12px;
      color: rgb(149, 151, 153);
    }
  }
  .nav {
    display: flex;
    font-size: 16px;
    .nav-item {
      margin-right: 30px;
      cursor: pointer;
    }
    .blue {
      color: #409eff;
    }
  }
  .tel-wrapper {
    display: flex;
    color: gray;
    align-items: center;
    .tel {
      margin-left: 10px;
    }
  }
}
</style>
<style scoped>
.imgAvaturl {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
</style>