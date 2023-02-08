<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- query参数的面包屑 -->
            <li
              class="with-x"
              v-show="searchParams.categoryName"
              @click="clearBreadQuery"
            >
              {{ searchParams.categoryName }}<i>×</i>
            </li>
            <!-- query参数的面包屑 -->
            <li
              class="with-x"
              v-show="$route.params.keyword"
              @click="clearBreadParams"
            >
              {{ $route.params.keyword }}<i>×</i>
            </li>
            <!-- 品牌参数的面包屑 -->
            <li
              class="with-x"
              v-show="searchParams.trademark"
              @click="clearBreadTrademark"
            >
              {{ searchParams.trademark.split(":")[1] }}<i>×</i>
            </li>
            <!-- 品牌售卖属性参数的面包屑 -->
            <li
              class="with-x"
              v-for="(prop, index) in searchParams.props"
              :key="index"
              @click="clearBreadTradevalue(index)"
            >
              {{ searchParams.props[index].split(":")[1] }}<i>×</i>
            </li>
          </ul>
        </div>

        <!--selector  -->
        <SearchSelector @tradeMarkIndo="tradeMarkIndo" @propInfo="propInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li @click.prevent="changeOrder(1)" :class="{ active: isOne }">
                  <a href="#"
                    >综合
                    <span
                      v-show="isOne"
                      class="iconfont"
                      :class="{
                        'icon-arrow-to-top': isAsc,
                        'icon-arrow-alt-from-top': isDesc,
                      }"
                    ></span>
                  </a>
                </li>
                <li @click.prevent="changeOrder(2)" :class="{ active: isTwo }">
                  <a href="#"
                    >价格
                    <span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{
                        'icon-arrow-to-top': isAsc,
                        'icon-arrow-alt-from-top': isDesc,
                      }"
                    ></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`"
                      ><img v-lazy="good.defaultImg"
                    />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :total="total"
            :continues="5"
            :pageSize="searchParams.pageSize"
            @pagiInfo="pagiInfo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        // 一级分类的id
        category1Id: "",
        // 二级分类的id
        category2Id: "",
        // 三级分类的id
        category3Id: "",
        // 分类名称
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序
        order: "1:desc",
        // 当前第几页
        pageNo: 1,
        // 一页几个数据
        pageSize: 5,
        // 平台售卖属性参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  computed: {
    ...mapGetters(["goodsList"]),
    ...mapState({
      total: (state) => state.search.searchlist.total,
    }),
    isOne: function () {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo: function () {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },

  methods: {
    // 将发送请求的行为封装为一个函数，在需要的时候调用
    // 向客户端发送params数据，接受返回的数据
    getData() {
      this.$store.dispatch("getSearchlist", this.searchParams);
    },
    // 清除query中categoryName的面包屑
    clearBreadQuery() {
      this.searchParams.categoryName = "";
      this.getData();
      if (this.$route.params) {
        this.$router.push({
          name: "sousuo",
          params: this.$route.params,
        });
      }
    },
    // 清除params的面包屑
    clearBreadParams() {
      this.searchParams.keyword = "";
      this.getData();
      this.$bus.$emit("clear");
      if (this.$route.query) {
        this.$router.push({
          name: "sousuo",
          query: this.$route.query,
        });
      }
    },
    // 获取子组件的tradmark品牌的信息
    tradeMarkIndo(trad) {
      this.searchParams.trademark = `${trad.tmId}:${trad.tmName}`;
      this.getData();
    },
    //清除品牌的面包屑
    clearBreadTrademark() {
      this.searchParams.trademark = "";
      this.getData();
    },
    // 从子组件获取search页面的属性值
    propInfo(prop) {
      if (this.searchParams.props.indexOf(prop) == -1) {
        this.searchParams.props.push(prop);
      }
      this.getData();
    },
    //清除品牌售卖属性参数的面包屑
    clearBreadTradevalue(index) {
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    // 排序问题
    changeOrder(flag) {
      // 设置变量判断传递的参数
      let originOrder = this.searchParams.order;
      // 设置初始的是综合还是价格
      let originFlag = originOrder.split(":")[0];
      // 设置初始的是升序还是降序
      let originSort = originOrder.split(":")[1];
      // 设置新的变量接受order的值
      let newOrder = "";
      // 判断排序方式和升序降序
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        newOrder = `${flag}:desc`;
      }
      this.searchParams.order = newOrder;
      this.getData();
    },
    //从pagination页面获取当前第几页
    pagiInfo(pageNo) {
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
  },

  // 在组件挂载完毕之前发送一次请求（为了从home页接受数据）

  beforeMount() {
    // ES6  Object.assign方法 合并参数
    Object.assign(this.searchParams, this.$route.params, this.$route.query);
  },

  // 在组件挂载完毕之后发送一次请求
  mounted() {
    this.getData();
    this.searchParams.category1Id = "";
    this.searchParams.category2Id = "";
    this.searchParams.category3Id = "";
  },
  watch: {
    $route(oldval, newval) {
      Object.assign(this.searchParams, this.$route.params, this.$route.query);
      this.getData();
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>