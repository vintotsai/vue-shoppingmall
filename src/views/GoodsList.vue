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
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price
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
                <a href="javascript:void(0)" v-bind:class="{'cur':priceChecked == 'all'}" @click="priceChecked = 'all'">All</a>
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
        },
        {
          start:'5000.00',
          end:'10000.00'
        }
      ],
      priceChecked:'all',
      filterPopFlag:false,
      overlayFlag:false
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
    getGoodsList() {
      axios.get('/goods').then((result) => {
        let res = result.data;
        this.goodsList = res.result.list;
      }).catch((err) => console.log(err))
    },
    showFilterPop(){
      this.filterPopFlag = true
      this.overlayFlag = true
    },
    setPriceFilter(index){
      this.priceChecked = index
      this.closeOverlay() //注意前面要写this
    },
    closeOverlay(){
      this.overlayFlag = false
      this.filterPopFlag = false
    },
    
  }
}
</script>

