<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span name="a">Goods</span>
      <!-- <span name="b">BB</span> -->
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd>
                <a href="javascript:void(0)">All</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">0 - 100</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">100 - 500</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">500 - 1000</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">1000 - 2000</a>
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
                      <img v-bind:src="'./static/'+item.productImg" alt="商品图">
                    </a>
                  </div>
                  <div class="main">
                    <div class="name" v-text="item.productName"></div>
                    <div class="price" v-text="item.productPrice"></div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      goodsList:[]
    }
  },
  components: {
    NavHeader: NavHeader, //两种写法效果一样
    NavFooter,
    NavBread
  },
  mounted: function(){
    this.getGoodsList()
  },
  methods: {
    getGoodsList() {
      axios.get('/goods').then((result)=>{
        let res = result.data;
        this.goodsList = res.result;
      }).catch((err) => console.log(err))
    }
  }
}
</script>

