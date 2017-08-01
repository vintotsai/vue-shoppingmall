<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span name="a">Goods</span>
      <!-- <span name="b">BB</span> -->
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <!-- 响应式布局 当web端宽度小于一定值时显示 -->
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur" @click="sortDefaultPrice">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortPrice">按Price升序降序
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>

        <div class="accessory-result">
          <div class="filter stopPop" v-bind:class="{'filterby-show':filterPopFlag}" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd >
                <a href="javascript:void(0)" v-bind:class="{'cur':priceChecked == 'all'}" @click="setPriceFilterAll">All</a>
              </dd>
              <dd v-for="(priceRange,index) in priceFilter" @click="setPriceFilter(index)">
                <a href="javascript:void(0)" v-bind:class="{'cur':index == priceChecked}">{{priceRange.start}} - {{priceRange.end}}</a>
              </dd>
            </dl>
          </div>
          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <a href="#">
                      <img v-lazy="'./static/'+item.productImage" alt="商品图">
                    </a>
                  </div>
                  <div class="main">
                    <div class="name" v-text="item.productName"></div>
                    <div class="price" v-text="item.salePrice"></div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addToCart(item,index)">加入购物车</a>
                    </div>
                  </div>
                </li>

              </ul>
              <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                <img src="./../assets/loading/loading-spinning-bubbles.svg" alt="loading..." v-show="loadingImg">
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
    <div class="md-overlay" v-show="overlayFlag" @click="closeOverlay"></div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavHeader from './../components/NavHeader'
import NavFooter from '@/components/NavFooter'
import NavBread from '@/components/NavBread'
import axios from 'axios'
export default {
  name: 'GoodsList',
  data() {
    return {
      goodsList: [],
      priceFilter: [
        {
          start:'0',
          end:'100.00'
        },
        {
          start:'100.00',
          end:'500.00'
        },
        {
          start:'500.00',
          end:'1000.00'
        },
        {
          start:'1000.00',
          end:'2000.00'
        },
        {
          start:'2000.00',
          end:'5000.00'
        }
      ],
      priceChecked:'all',
      filterPopFlag:false,
      overlayFlag:false,
      sortPriceFlag:true, //true代表1升序排列
      page:1,
      pageSize:8,
      busy:true,//滚动加载默认为true表示一开始时关闭滚动加载功能。
      loadingImg:false,
    }
  },
  components: {
    NavHeader: NavHeader, //两种写法效果一样
    NavFooter,
    NavBread
  },
  mounted: function () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList(flag) {
      // var param = {
      //   page:this.page,
      //   pageSize:this.pageSize,
      // }
      this.loadingImg = true;
      var sort = this.sortPriceFlag ? 1 : -1;
      axios.get('/goods'+'?page='+this.page+'&pageSize='+this.pageSize+'&sort='+sort+'&priceRange='+this.priceChecked).then((result) => {
        this.loadingImg= false;
        let res = result.data;
        if(res.status == 1){
          if(flag){
            this.goodsList = this.goodsList.concat(res.result.list)
            if(res.result.count<this.pageSize){
              this.busy = true;
            }else{
              this.busy = false;
            }
          }else{
            this.goodsList = res.result.list;
            this.busy = false;
          }
        }else{
          this.goodsList =[]
        }
        
      }).catch((err) => console.log(err))
    },
    showFilterPop(){
      this.filterPopFlag = true
      this.overlayFlag = true
    },
    setPriceFilter(index){
      this.priceChecked = index
      this.closeOverlay() //注意前面要写this
      this.page = 1
      this.getGoodsList()
    },
    setPriceFilterAll(){
      this.priceChecked = 'all'
      this.page = 1
      this.closeOverlay()
      this.getGoodsList()
    },
    closeOverlay(){
      this.overlayFlag = false
      this.filterPopFlag = false
    },
    sortPrice(){
      this.sortPriceFlag = ! this.sortPriceFlag
      this.getGoodsList()
    },
    sortDefaultPrice(){
      this.sortPriceFlag = true
      this.getGoodsList()      
    },
    loadMore(){
      this.page++;
      this.busy = true
      setTimeout(() => {
        this.getGoodsList(true)
      }, 1000)
    },
    addToCart(item,index){
      axios.post('/goods/addCart',{
        productId:item.productId,
        deepbreath:'totsai'
      }).then((res)=>{
        let data = res.data;
        if(data.status == '1'){
          alert('添加成功。')
        }else{
          alert('mesg:'+data.msg)
        }
      })
    },
  }
}
</script>

