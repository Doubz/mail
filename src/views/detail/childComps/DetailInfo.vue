<template>
  <div class="detail_info">
    <div class="detail_info_desc">
      <div class="start"></div>
      <div class="info_desc">
        {{DetailInfo.desc !== "" ? DetailInfo.desc:"无"}}
      </div>
      <div class="end"></div>
    </div>
    <div class="key">
      {{DetailInfo.key}}
    </div>
    <div class="pic">
      <img v-for="item in DetailInfo.list" :src="item" alt="" @load="imgLoad">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailInfo",
    props: {
      DetailInfo: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        count: 0,
        imageLength: 0
      }
    },
    methods: {
      imgLoad() {
        if (++this.count === this.imageLength) {
          this.$emit("scrollRefresh")
        }
      }
    },
    watch: {
      DetailInfo() {
        this.imageLength = this.DetailInfo.list.length
      }
    }
  }

</script>

<style scoped>
  .detail_info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .detail_info_desc {
    padding: 0 8px;
  }

  .start {
    width: 90px;
    height: 1px;
    background: #a3a3a5;
    position: relative;
  }

  .start::before {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    background: #333;
    bottom: 0;
  }

  .end {
    width: 90px;
    height: 1px;
    background: #a3a3a5;
    position: relative;
    float: right;
  }

  .end::after {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    background: #333;
    top: 0;
    right: 0;
  }

  .info_desc {
    padding: 10px 0;
  }

  .key {
    padding: 20px 8px;
  }

  .pic {
    width: 100vw;
  }

  .pic img {
    width: 100%;
  }

</style>
